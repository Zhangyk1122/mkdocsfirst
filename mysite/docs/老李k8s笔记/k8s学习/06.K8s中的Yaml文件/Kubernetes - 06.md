---
title: My Secret Page
encrypt: true
password: "zyk4321."
---
# Kubernetes的YAML文件

## 1. K8s支持的文件格式

K8s 中支持使用 YAML 和 JSON 格式创建资源对象。

~~~shell
kubectl apply -f nginx-deploy.json
kubectl apply -f nginx-deploy.yaml
~~~

JSON ： 主要用于 K8s 命令行工具( kubectl ) 与 apiserver 之间的数据传递。

~~~shell
kubectl create deploy my-nginx --port=80 --image=nginx --dry-run=client -o json 
~~~

YAML ：用于配置和管理资源，内容格式人性化，更适合作为配置文件。

~~~shell
kubectl create deploy my-nginx --port=80 --image=nginx --dry-run=client -o yaml 
~~~



## 2.认识YAML

YAML的全称是 "**Y**AML **A**in't **M**arkup **L**anguage"，意思是"YAML不是一种标记语言"。
它是一种基于文本的对象串行化语言，强调数据本身而不是标记‌。

~~~markdown
对象串行化：也就是通过写出描述自己状态的数值来记录自己,这个过程叫对象的串行化。
~~~

YAML 基本规则如下：

~~~markdown
- 不支持制表符tab键缩进，需要使用空格缩进，缩进表示层级关系
- 通常开头缩进2个空格，空格数不重要，只要相同层级的元素左对齐即可
- 遇到特殊字符后缩进一个空格，如冒号、逗号、横杆
- 单词区分大小写
- 字符串默认不用引号，某些特殊字符需要使用引号括起来，例如：'2024-11-12T07:14:03Z'、'123456'
- ”#” 表示注释
- "---" 表示分隔符
~~~

[YAML在线工具](https://www.devtools.cn/validators/yaml_editor/)



## 3. YAML中的数据结构

YAML中的数据结构包含：对象、数组和纯量。本节就常用的对象、数组进行分析。

对象结构

对象采用 "key: value" 格式表示，是 YAML 中的最常见的表达方式。例如：

~~~yaml
name: laoli
~~~

~~~yaml
person: 
  name: laoli
  sex: male
~~~

数组结构

数组采用 "key: -value" 格式表示，表示一组按次序排列的值，也有称 "列表"。例如：

~~~yaml
name:
  - laoli
  - coco
~~~

~~~yaml
persons: 
  - name: laoli
    sex: male
  - name: coco
    sex: female
~~~



## 4. api-resoucres和api-versions

api-resoucres 表示集群中所有可用资源的列表；api-versions 表示集群中所有可用 api 版本列表。

在 K8s 中所有资源都被定义为 API 对象，这些对象的解析需要依赖特定的 API 版本，错误的版本会导致 K8s 错误的理解和应用对象的定义。

~~~shell
# 所有可用资源的列表
kubectl api-resources
# 所有可用 api 版本列表
kubectl api-versions 
# 指定类型的资源文档
kubectl explain 资源类型
~~~

常用 API 对象的版本对照：

| API 对象   | API 版本 |
| ---------- | -------- |
| Pod        | v1       |
| Service    | v1       |
| ConfigMap  | v1       |
| Namespace  | v1       |
| Deployment | apps/v1  |
|            |          |

## 5.  Pod 的 YAML 模板

~~~yaml
#api版本，必选
apiVersion: v1

#资源类型，必选
kind: Pod

#资源的元数据，必选
metadata:
  #pod的名字，必选
  name: pod-mysql
  #资源的命名空间，可选，默认default
  namespace: default
  #资源标签，可选，建议书写，便于标识和分类资源对象
  labels:
    app: myapp

#资源的规格描述，必选    
spec:
  #数据卷，可选  
  volumes:
    #数据卷名字
    - name: vol-mysql
      hostPath:
        #数据卷的节点路径
        path: /root/mysql
        #目录存在就使用,不存在就先创建后使用
        type: DirectoryOrCreate
  #容器重启(Always-默认值始终重启，OnFailure-异常停止才重启，Nerver-始终不重启)
  restartPolicy: OnFailure
  #Pod里面容器的详细配置，必选
  containers:
    #容器名字，必选
    - name: mysql-container
      #容器镜像，必选
      image: mysql:latest
      #容器暴露的端口，可选
      ports:
        #端口名字
        - name: http-3306
          #端口的值
          containerPort: 3306
          #端口协议，支持TCP和UDP。默认TCP
          protocol: TCP      
      #容器的数据卷挂载
      volumeMounts:
        #引用前面volumes定义的数据卷名字
        - name: vol-mysql
          #数据卷的容器路径
          mountPath: /var/lib/mysql
      #容器的环境变量，可选
      env:
        #管理员密码
        - name: MYSQL_ROOT_PASSWORD
          value: '123456'
        #容器的时区
        - name: TZ
          value: Asia/Shanghai
      #容器的工作目录，可选
      workingDir: /var/lib/mysql    
      #镜像拉取策略(Always-默认值下载优先，Never-仅使用本地，IfNotPresent-本地优先，其次下载)
      imagePullPolicy: IfNotPresent   	  
~~~

测试

~~~shell
# 查看执行pod的节点数据卷
ls /root/mysql
# 进入pod的容器
kubectl exec -it pod-mysql bash
# 登录mysql
mysql -uroot -p
# 删除pod
kubectl delete -f pod-mysql.yaml
~~~



## 6. Deployment 的 YAML 模板

~~~yaml
#api的版本，必选
apiVersion: apps/v1

#资源类型，必选
kind: Deployment

#资源的元数据，必选
metadata:
  #deploy的名字，必选
  name: deploy-mysql
  #资源的命名空间，可选，默认default
  namespace: default
  #资源标签，可选，建议书写，便于标识和分类资源对象
  labels:
    app: myapp  

#deploy的规格描述，必选
spec:
  # pod的副本数量(默认1)
  replicas: 1
  # 标签选择器
  selector:
    # 匹配标签，需与上面的metadata.labels定义的app保持一致
    matchLabels:
      app: myapp  
  # 业务模板，必选
  template:
    # 模板元数据
    metadata:
      # 模板的标签，需与上面的metadata.labels定义的app保持一致
      labels:
        app: myapp
    # 模板详细配置
    spec:
      #数据卷，可选  
      volumes:
        #数据卷名字
        - name: vol-mysql
          hostPath:
            #数据卷的节点路径
            path: /root/mysql
            #目录存在就使用,不存在就先创建后使用
            type: DirectoryOrCreate
      #Pod里容器的重启策略(deploy仅支持Always)
      restartPolicy: Always
      #Pod里容器的详细配置，必选
      containers:
        #容器名字，必选
        - name: mysql-container
          #容器镜像，必选
          image: mysql:latest
          #容器暴露的端口，可选
          ports:
            #端口名字
            - name: http-3306
              #端口的值
              containerPort: 3306
              #端口协议，支持TCP和UDP。默认TCP
              protocol: TCP      
          #容器的数据卷挂载
          volumeMounts:
            #引用前面volumes定义的数据卷名字
            - name: vol-mysql
              #数据卷的容器路径
              mountPath: /var/lib/mysql
          #容器的环境变量，可选
          env:
            #管理员密码
            - name: MYSQL_ROOT_PASSWORD
              value: '123456'
            #容器的时区
            - name: TZ
              value: Asia/Shanghai
          #容器的工作目录，可选
          workingDir: /var/lib/mysql    
          #镜像拉取策略(Always-默认值下载优先，Never-仅使用本地，IfNotPresent-本地优先，其次下载)
          imagePullPolicy: IfNotPresent      
~~~

测试

~~~shell
# 查看deploy
kubectl get deploy deploy-mysql
~~~



## 7. Service 的 YAML 模板

~~~yaml
#api版本，必选
apiVersion: v1

#资源类型，必选
kind: Service

#资源的元数据，必选
metadata:
  #service的名字，必选
  name: service-mysql
  #资源的命名空间，可选，默认default
  namespace: default  

#资源的规格描述，必选
spec:
  # service的类型(NodePort会每个节点上开放一个静态端口,通过静态端口对外暴露服务)
  type: NodePort
  # 标签选择器(据此与deployment关联)
  selector:
    app: myapp  
  # 服务的端口列表
  ports:
    # 服务监听的容器端口
    - port: 3306
      # 服务端口
      targetPort: 3306  
      # 节点端口(默认在30000~32767自动分配)  
      nodePort: 30336
~~~

测试

~~~shell
#查看service
kubectl get svc service-mysql -o wide
#使用navicat等类似工具访问
~~~



