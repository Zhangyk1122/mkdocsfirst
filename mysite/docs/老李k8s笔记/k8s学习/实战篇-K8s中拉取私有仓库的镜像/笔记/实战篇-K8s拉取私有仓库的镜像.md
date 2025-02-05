---
title: My Secret Page
encrypt: true
password: "zyk4321."
---

# K8s拉取私有仓库的镜像

## 1. 前言

实战篇基于之前发表的两个视频系列

~~~markdown
1. 《Docker容器技术，从零入门全面掌握》
2. 《Kubernetes容器编排技术》
~~~

至少确保已经学习过如下的内容

~~~markdown
1. Docker方面(拉取镜像、运行容器、docker-compose技术)
2. Kubernetes方面(yaml文件、kubectl命令的基础、secret资源的使用)
~~~

实验环境

~~~markdown
1. Centos操作系统(Centos 7.9 + Kernel 5.4.278)
2. Docker环境(docker-engine 26.1.4 + docker-compose 2.27.1)
3. Kubernetes集群环境(Kubernetes 1.28.2)
~~~



## 2. 搭建私有镜像仓库

**步骤一：准备Registry和Registry_UI镜像**

~~~shell
# 创建registry专用目录(compose存放docker-compose的文件，auth存放认证信息，data存放的镜像信息)
mkdir -p /root/registry/{compose,auth,data,tar}
# 加载registry镜像(docker官方提供的私有仓库镜像)
docker load -i registry.tar
# 加载registry-ui镜像(一个基于registry的带前端界面的镜像)
docker load -i joxit-docker-registry-ui_1.5-static.tar
~~~

**步骤二：安装htpasswd工具** 

~~~shell
# 安装htpasswd工具(一个生成http认证信息的工具)
yum -y install httpd-tools
# 生成登录凭据文件passwd
htpasswd -Bbn laoli 123456 > /root/registry/auth/passwd
# 查看登录凭据文件
cat /root/registry/auth/passwd
~~~

**步骤三：准备docker-compose文件**

~~~yaml
# /root/registry/compose/docker-compose.yml
version: "3.8"
services:
  # 1.registry服务
  registry:
    image: registry
    restart: always
    volumes:
      - /root/registry/data:/var/lib/registry
	  - /root/registry/auth:/etc/registry/auth
    environment:
      - REGISTRY_AUTH=htpasswd
      - REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm
      - REGISTRY_AUTH_HTPASSWD_PATH=/etc/registry/auth/passwd
  # 2.registry_ui服务    
  registry-ui:
    image: joxit/docker-registry-ui:1.5-static	
    ports:
      - 81:80
    environment:
      - REGISTRY_TITLE=老李的私有仓库	
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry
~~~



## 3. 测试私有镜像仓库

**步骤一：客户端添加受信任的仓库**

~~~shell
# 所有需要拉取私有仓库镜像的客户端上，添加受信任的仓库地址
vim /etc/docker/daemon.json
  "insecure-registries": ["192.168.1.52:81"]
# 立即生效
sudo systemctl daemon-reload && sudo systemctl restart docker
~~~

**步骤二：登录私有镜像仓库**

~~~shell 
# -u指定用户名，回车后要求输入password
docker login -ulaoli 192.168.1.52:81
~~~

**步骤三：推送和拉取镜像**

~~~shell
# 重做tag
docker tag alpine:3.7 192.168.1.52:81/alpine:3.7
# 推送镜像
docker push 192.168.1.52:81/alpine:3.7
# 拉取镜像
docker pull 192.168.1.52:81/alpine:3.7
~~~



## 4. K8s拉取私有仓库镜像

~~~shell
# 配置私有镜像仓库的信息
kubectl create secret docker-registry laoli-registry-auth -n default \
--docker-server=192.168.1.52:81 \
--docker-username="laoli" \
--docker-password="123456"
# 查看创建的保密字典
kubectl get secret laoli-registry-auth -o yaml
~~~

~~~yaml
# 创建pod测试拉取私有仓库镜像
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mydeploy
  namespace: default
  labels:
    app: alpine
spec:
  selector:
    matchLabels:
      app: alpine
  replicas: 1
  template:
    metadata:
      labels:
        app: alpine
    spec:
      # 1.私有镜像仓库的保密字典
      imagePullSecrets:
        - name: laoli-registry-auth         
      containers:
        - name: container-alpine
          # 2.拉取私有镜像仓库的alpine镜像
          image: 192.168.1.52:81/alpine:3.7
          command: ["bin/sh","-c","sleep 3600"] 
~~~
