---
title: My Secret Page
encrypt: true
password: "zyk4321."
---

# Ingress实现金丝雀/蓝绿发布

## 1. 前言

本次实战基于以下两个视频：

~~~markdown
1. 《Pod控制器-金丝雀发布》
2. 《K8s网关生态标准Ingress》
~~~

实验环境

~~~markdown
1. Centos操作系统(Centos 7.9 + Kernel 5.4.278)
2. Docker环境(docker-engine 26.1.4 + docker-compose 2.27.1)
3. Kubernetes集群环境(Kubernetes 1.28.2)
~~~

## 2. 安装Ingress-Controller

本次选用K8s官方提供的 ingress 控制器 "ingress-nginx"，此控制器基于 nginx 打造，由 K8s 社区维护。

~~~markdown
- 《K8s网关生态标准Ingress》视频已介绍过安装步骤，本处不再赘述。安装资料包免费提供
~~~

~~~shell
# 工作节点上导入ingress控制器的镜像(所有工作节点)
docker load -i nginx-ingress_image_1.12.0.tar
# 执行资源清单(管理节点)
kubectl apply -f ingress-deploy.yaml
~~~

检查安装的结果

~~~shell
kubectl get svc -n ingress-nginx
kubectl get pod -n ingress-nginx -o wide
~~~

记录 http 协议端口(80) 所映射的节点端口

~~~markdown
80:32416
~~~

## 3. 准备Pod和Service

**步骤一：准备命名空间**

~~~shell
# 创建专用命名空间
kubectl create ns canary
~~~

**步骤二：准备升级前、后的Pod与Service资源** 

~~~yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy124
  namespace: canary
  labels:
    app: nginx124
spec:
  selector:
    matchLabels:
      app: nginx124
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx124
    spec:
      containers:
        - name: container-nginx124
          image: mynginx:1.24.0  # 更新目标：mynginx:1.24.0 -> mynginx:1.26.2
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service124
  namespace: canary
spec:
  selector:
    app: nginx124
  ports:
    - port: 80
      targetPort: 80
~~~

注意：为方便的观察版本差异，在官方nginx的镜像基础上修改了 index.html 文件得到 mynginx 镜像

~~~shell
docker load -i mynginx124.tar
docker load -i mynginx126.tar
~~~



## 4. 创建Ingress代理Service

~~~yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress
  namespace: canary
spec:
  ingressClassName: nginx
  rules:
    - host: www.nginx.com
      http:
        paths:
          - path: /
            backend:
              service:        
                name: nginx-service124
                port: 
                  number: 80
            pathType: Prefix
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress-canary
  namespace: canary
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"  # 允许Ingress资源将流量发送到金丝雀部署
spec:
  ingressClassName: nginx
  rules:
    - host: www.nginx.com
      http:
        paths:
          - path: /
            backend:
              service:        
                name: nginx-service126
                port: 
                  number: 80
            pathType: Prefix
~~~

修改主机hosts：由于域名`www.nginx.com`属于测试域名，需要在发起访问的主机上配置该域名与IP的映射

~~~shell
1. Linux系统
   echo '192.168.1.50 www.nginx.com' >> /etc/hosts
   echo '192.168.1.51 www.nginx.com' >> /etc/hosts
2. Windows系统
   找到 'C:\Windows\System32\drivers\etc\hosts' 路径，复制hosts到桌面修改后替换原位置文件
~~~

注意：`192.168.1.50`  和 `192.168.1.51` 是运行了 ingress-nginx 的虚拟主机IP。

## 5. 实现金丝雀/蓝绿发布

**方式一：基于权重(Weight)实现金丝雀发布**

~~~yaml
# 在ingress-canary对象的annotations下添加权重，权重范围[0-100]，表示流量百分比
annotations:
  nginx.ingress.kubernetes.io/canary-weight: "20"
~~~

**方式二：基于Cookie实现蓝绿发布**

~~~yaml 
# 在ingress-canary对象的annotations下修改
annotations:
  nginx.ingress.kubernetes.io/canary-by-cookie: "ingress-canary"
# 可选下方两个不同的流量策略
  ingress-canary=always  # 总是将流量切入到金丝雀部署
  ingress-canary=never   # 从不将流量切入到金丝雀部署
~~~

**方式三：基于Header实现蓝绿发布**

~~~yaml
# 在ingress-canary对象的annotations下修改
annotations:
  nginx.ingress.kubernetes.io/canary-by-header: "ingress-canary"
# 可选下方两个不同的流量策略
  ingress-canary=always  # 总是将流量切入到金丝雀部署
  ingress-canary=never   # 从不将流量切入到金丝雀部署  
~~~

注意：不同方式的优先级 **由高到低** 为 Header > Cookie > Weight

 
