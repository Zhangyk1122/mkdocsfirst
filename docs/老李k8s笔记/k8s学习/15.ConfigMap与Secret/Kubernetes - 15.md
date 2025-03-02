---
title: My Secret Page
encrypt: true
password: "zyk4321."
---
# ConfigMap与Secret

## 1. ConfigMap

ConfigMap 中文叫"配置字典" ，缩写为 cm，支持命名空间。ConfigMap 经常用来配置环境变量，挂载配置文件等等。

~~~shell
k api-resources |head -1;k api-resources|grep cm
~~~

注意：ConfigMap 的设计目的是用来存储非敏感数据而不是大量数据，数据量不可超过 1 MB。

**实验一：配置环境变量**

~~~yaml
# 1.定义ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  # ConfigMap的名字
  name: timezone
  # 默认的命名空间
  namespace: default
data:
  TZ: Asia/Shanghai
  
  
# 2.Pod引用ConfigMap(片段)
spec:
  containers:
    - name: container-nginx
      image: nginx:1.26.2
      ports:
        - containerPort: 80
      # 引用ConfigMap(法1)
      env:                  
        - name: TZ 
          valueFrom:
            configMapKeyRef:			  
              name: timezone
              key: TZ
      # 引用ConfigMap(法2)    
      envFrom:                  
        - configMapRef:            
            name: timezone 
~~~

~~~shell
# 创建configmap和pod
kubectl apply -f configmap.yaml,deploy.yaml

# 进入Pod查看容器时间
kubectl exec -it <pod-name> -- date

# 修改configmap将TZ=Asia/Aden (比Shanghai晚5小时)，重新apply

# 重启pod(使用新的环境变量)
kubectl rollout restart deploy mydeploy
~~~

**从文件创建 ConfigMap** 

~~~shell
kubectl create configmap timezone -n default --from-env-file=env.txt
~~~



**实验二：redis配置文件**

~~~yaml
# 1.定义ConfigMap保存redis的配置文件
apiVersion: v1
kind: ConfigMap
metadata:
  # ConfigMap的名字
  name: redis-config
  # 默认的命名空间
  namespace: default
data:
  redis.conf: |
    bind 0.0.0.0
    protected-mode no
    port 6379
    requirepass 123456   
    
# 2.Pod挂载ConfigMap(片段)
spec:
  volumes:
    - name: redis-conf
      # 引用ConfigMap
      configMap:
        name: redis-config
  containers:
    - name: container-redis
      image: redis:6.2
      ports:
        - containerPort: 6379
      volumeMounts:
        - name: redis-conf
          mountPath: /etc/config
      command: ["redis-server","/etc/config/redis.conf"]

# 3. 定义Service供测试redis的连接
apiVersion: v1
kind: Service
metadata:
  name: redis-service
  namespace: default
  labels:
    app: redis
spec:
  selector:
    app: redis
  type: NodePort
  ports:
    - port: 6379
      targetPort: 6379
      nodePort: 30379
~~~

~~~shell
# 创建configmap和pod
kubectl apply -f configmap.yaml,deploy.yaml

# 进入Pod查看容器的配置文件
kubectl exec -it <pod-name> -- cat /etc/config/redis.conf

# 创建service，然后通过指定配置连接redis
kubectl apply -f redis-svc.yaml

# 从集群外使用"节点IP+30379端口"测试连接redis
~~~

**使用预定义的配置文件来创建 ConfigMap **

~~~shell
kubectl create configmap redis-config -n default --from-file=redis.conf
~~~



## 2. Secret

Secret 中文叫"保密字典"，无缩写，支持命名空间 。Secret  用于保存敏感的数据。如：登录密码、私有镜像仓库的配置信息。

~~~shell
kubectl api-resources |head -1;k api-resources |grep Secret
~~~

注意：Secret 采取 Base64 对敏感数据编码，并非真正意义上的"加密"，一旦拥有了对集群的访问权利，可通过解码的方式获取原始数据。实现真正意义的加密还需要通过其他的途径(静态加密或第三方插件)。

**Base64编码**

~~~shell
# 将密码明文"编码"为密文
echo -n 'my-password' | base64
# 将密码密文"解码"为明文
echo 'bXktcGFzc3dvcmQ=' | base64 --decode
~~~

**创建Secret**

~~~yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
  namespace: default
  labels:
    app: secret
# 1.类型(Opaque-默认密文类型。kubernetes.io/dockerconfigjson-序列化的json类型)
# 更多类型：https://kubernetes.io/docs/concepts/configuration/secret/#secret-types
type: Opaque
# 2.数据   
data:
  mysql-pass: bXktcGFzc3dvcmQ=
~~~

~~~shell
# 字面量创建
kubectl create secret generic mysecret -n default --from-literal=mysql-pass=my-password
# 从文件创建
kubectl create secret generic mysecret -n default --from-env-file=env.txt
# 查看
kubectl get secret mysecret -oyaml
~~~

**环境变量形式引用Secret**          

~~~yaml
# pod中引用secret(环境变量)
spec:
  containers:
    - name: container-mysql
      image: mysql:8.0.27
      ports:
        - containerPort: 3306          
      env:
          # 1.环境变量Key
        - name: MYSQL_ROOT_PASSWORD
          # 2.环境变量Value引用secret
          valueFrom:
            secretKeyRef:
              name: mysecret
              key: mysql-pass
~~~

**存储卷形式引用secret**

~~~yaml
# pod中引用secret(存储卷)
spec:
  volumes:
    - name: vol-secret
      # 1.存储卷引用secret
      secret:
        secretName: mysecret
  containers:
    - name: container-alpine
      image: alpine:3.7
      command: ["bin/sh","-c","sleep 3600"]
      # 2.容器挂载secret
      volumeMounts:
        - name: vol-secret
          mountPath: /secret
~~~

Secret 还可以用于保存私有镜像仓库的配置信息(如仓库地址、访问端口、登录名和密码)，Pod 可使用这些敏感信息拉取镜像。

