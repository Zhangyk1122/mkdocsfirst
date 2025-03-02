---
title: My Secret Page
encrypt: true
password: "zyk4321."
---
# Kubernetes 命名空间

## 1. 什么是命名空间

命名空间，也叫做名字空间。英译 "Namespace"，在 K8s 中简写成 "ns"。它是一种在 K8s 集群内部**组织和隔离资源**的机制，属于一种逻辑上的概念。命名空间将物理集群划分为多个逻辑部分，每个部分都有自己的一组资源(如Pod、Service、ConfigMap等 )。

软件开发领域很多技术都有命名空间的概念，并非 K8s 的专利。例如：Oracle 的 Namespace、C# 的Namespace，Java 中不叫 Namespace，对等的概念叫做 Package 。

K8s 中并非所有的资源都基于命名空间，某些跨集群的资源并不需要基于命名空间。

~~~markdown
# 查看集群所有资源
kubectl api-resources  
~~~



## 2. 为什么需要命名空间

总结来讲，命名空间最大的作用就是"隔离"，例如：

**隔离相互影响**：不同的命名空间中的资源可以重名，但在同一个命名空间中的资源名必须保证唯一。

**隔离资源分配**：不同的命名空间可以限制的资源类型（如 CPU、内存、存储等）以及相应的分配额度，确保每个命名空间中的资源不会"超限"，从而避免资源过度消耗和竞争。

**隔离访问控制**：通过将用户和进程限制在某些命名空间中，增强基于角色的访问控制(RBAC)，提升安全性。



## 3. 初始命名空间

Kubernetes 启动时会创建四个初始命名空间

~~~markdown
# default
默认的命名空间便于立即开始使用新集群。在未特别指定的情况下，每个 Kubernetes 命令默认引用这个命名空间。
# kube-node-lease
包含用于与各个节点关联的 Lease（租约）对象。 节点租约允许 kubelet 发送心跳， 由此控制面能够检测到节点故障。
# kube-public
该空间主要预留为集群使用，以便某些资源需要在整个集群中的可见，这种可见包括未经身份验证的客户端。
# kube-system
该名字空间用于 Kubernetes 系统创建的对象，不建议用户使用。
~~~

查看所有命名空间

~~~shell
kubectl get namespaces | ns
~~~

查看指定命名空间的详细信息

~~~shell
kubectl describe ns 空间名字
~~~

Kubesphere 中查看命名空间的路径：集群 -> 项目 -> 用户项目 | 系统项目



## 4. 创建命名空间

以开发环境、生产环境两种场景为例，创建不同的命名空间如下

~~~shell
kubectl create ns dev-ns | pro-ns
kubectl get ns
kubectl describe ns dev-ns
# 注意：命名空间的操作需要管理员权限。
~~~

在指定的命名空间下创建 deployment，不指定则创建在 default 空间中。

~~~shell
kubectl create deploy my-nginx --image=nginx:latest -n dev-ns
~~~

在指定的命名空间下创建 service，不指定则创建在 default 空间中。

~~~shell
kubectl expose deploy my-nginx --port=80 --type=NodePort -n dev-ns
~~~

Kubesphere 中创建命名空间的路径：集群 -> 项目 -> 用户项目 -> 创建



## 5. 删除命名空间

删除命名空间及其所有资源(包括pod、deployment、service、ConfigMaps等等，谨慎操作！)

~~~shell
kubectl delete ns 空间名字

# 注意：初始命名空间中"kube-node-lease"删除后会自动重建，其余空间不允许删除！
~~~

删除命名空间的pod

~~~shell
kubectl delete pod <pod名字> -n dev-ns
kubectl delete pod --all -n dev-ns

# 注意：pod删除后会自动重建！
~~~

删除命名空间的deploy

~~~shell
kubectl delete deploy <deploy名字> -n dev-ns
kubectl delete deploy --all -n dev-ns
~~~

删除命名空间的service

~~~shell
kubectl delete service <service名字> -n dev-ns
kubectl delete service --all -n dev-ns
~~~

Kubesphere 中删除命名空间的路径：集群 -> 项目 -> 用户项目 -> 勾选项目 -> 删除



## 6. YAML 模板

~~~yaml
#api版本
apiVersion: v1
#资源类型
kind: Namespace
#资源的元数据
metadata:
  #命名空间的名字
  name: dev-ns
~~~

~~~shell
# 创建命名空间
kubectl apply -f dev-ns.yaml
# 删除命名空间
kubectl delete -f dev-ns.yaml
~~~

