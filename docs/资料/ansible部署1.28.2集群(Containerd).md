# ansible部署1.28.2集群(Containerd)

# kubernetes集群规划

| 主机名   | IP地址        | 角色     | 操作系统        | 硬件配置        |
| -------- | ------------- | -------- | --------------- | --------------- |
| master01 | 192.168.3.121 | 管理节点 | Rocky linux 9.0 | 2CPU/4G内存/50G |
| node01   | 192.168.3.122 | 工作节点 | Rocky linux 9.0 | 2CPU/4G内存/50G |
| node02   | 192.168.3.123 | 工作节点 | Rocky linux 9.0 | 2CPU/4G内存/50G |

#  集群前期环境准备

>  按照集群规划修改每个节点主机名  **提示：以下前期环境准备需要在所有节点都执行**

```
hostnamectl set-hostname xxx
#关闭防火墙以及selinux
systemctl stop firewalld && systemctl disable firewalld
setenforce 0
sed -i '/^SELINUX=/c SELINUX=disabled' /etc/selinux/config
```

# 安装ansible

```
dnf install -y epel-release
#用于在基于Red Hat的系统（如Rocky Linux、AlmaLinux、CentOS等）上安装EPEL（Extra Packages for Enterprise Linux）仓库

dnf makecache

dnf install -y ansible
```

> 安装ansible之后的一些准备

```
vim /etc/ansible/hosts
[root@master01 ~]# cat /etc/ansible/hosts    #之前的注释可以全部删除
[k8s]
192.168.3.121
192.168.3.122
192.168.3.123

[root@master01 ~]# ansible k8s --list-host
  hosts (3):
    192.168.3.121
    192.168.3.122
    192.168.3.123

#配置免密登录
ssh-keygen
[root@master01 ~]# for ip in 192.168.3.{121..123}
> do
> ssh-copy-id $ip
> done
```

# 配置hosts文件

```
[root@master01 ~]# mkdir cluster-k8s   # 创建工作目录
[root@master01 ~]# cd cluster-k8s/
[root@master01 cluster-k8s]# cp /etc/hosts ./   #复制 etc的hosts文件到当前目录
[root@master01 cluster-k8s]# cat hosts   #加上主机名
192.168.3.121 master01
192.168.3.122 node1
192.168.3.123 node2

[root@master01 cluster-k8s]# ansible k8s -m copy -a "src=./hosts dest=/etc/hosts" 
ansible: 这是 Ansible 的命令行工具，用于执行各种自动化任务。

k8s: 这是你在 Ansible 中定义的一个主机组的名称。Ansible 会根据这个组名找到对应的主机列表，并在这些主机上执行任务。

-m copy: -m 选项用于指定要使用的 Ansible 模块。这里使用的是 copy 模块，它的功能是将文件从控制节点复制到目标节点。

-a "src=./hosts dest=/etc/hosts" -a 选项用于传递模块的参数。这里传递给 copy 模块的参数是：

src=./hosts: 指定源文件的路径。./hosts 表示当前目录下的 hosts 文件。

dest=/etc/hosts: 指定目标路径。/etc/hosts 表示目标节点上的 /etc/hosts 文件

[root@master01 cluster-k8s]# ansible k8s -m shell -a "cat /etc/hosts"

# 结果黄色表示成功，绿色表示没有对主机进行操作，红色报错
```

# 开启bridge网桥过滤 

> bridge(桥接) 是 Linux 系统中的一种虚拟网络设备，它充当一个虚拟的交换机，为集群内的容器提供网络通信功能，容器就可以通过这个 bridge 与其他容器或外部网络通信了。

```
[root@master01 cluster-k8s]# cat k8s.conf 
net.bridge.bridge-nf-call-ip6tables = 1   #对网桥上的IPv6数据包通过iptables处理
net.bridge.bridge-nf-call-iptables = 1    #对网桥上的IPv4数据包通过iptables处理
net.ipv4.ip_forward = 1                   #开启IPv4路由转发,来实现集群中的容器与外部网络的通信
[root@master01 cluster-k8s]# ansible k8s -m copy -a 'src=k8s.conf dest=/etc/sysctl.d/'

```

> 由于开启bridge功能，需要加载br_netfilter模块来允许在bridge设备上的数据包经过iptables防火墙处理

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'modprobe br_netfilter'
```

> 生效文件

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'sysctl -p /etc/sysctl.d/k8s.conf'   #第一次需要手动生效，后面就会开机自启

```

>  发现重启后模块好像没有生效，添加以下内容

```
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF

sysctl --system
```



# 关闭SWAP交换分区

>  为了保证 kubelet 正常工作，k8s强制要求禁用，否则集群初始化失败

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'swapoff -a'  #临时关闭
[root@master01 cluster-k8s]# ansible k8s -m shell -a "sed -ri 's/.*swap.*/#&/' /etc/fstab"  #永久关闭   这里还需要注意引号，如果sehll里面有单引号，-a要带双引号
```

# 安装Containerd软件包（1.24后版本推荐）

> 添加阿里云docker-ce仓库（containerd软件包在docker仓库）

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'dnf install -y yum-utils && \
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo'
```

> 安装containerd软件包

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'dnf install -y containerd.io-1.6.20-3.1.el9.x86_64'
```

> 生成containerd配置文件 由于原本的配置文件不能直接用，所以需要重新生成

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a'containerd config default | tee /etc/containerd/config.toml'
```

> 启用Cgroup用于限制进程的资源使用量，如CPU、内存资源

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a "sed -i 's#SystemdCgroup = false#SystemdCgroup = true#' /etc/containerd/config.toml"
```

> 替换文件中pause镜像的下载地址为阿里云仓库

```
#如果遇到引号太多的情况可以写进一个shell脚本，然后ansible执行
[root@master01 cluster-k8s]# cat image.sh 
sed -i 's#sandbox_image = "registry.k8s.io/pause:3.6"#sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.9"#' /etc/containerd/config.toml
[root@master01 cluster-k8s]# ansible k8s -m script -a "image.sh"
```

> 为Containerd配置镜像加速器，在文件中找到`[plugins."io.containerd.grpc.v1.cri".registry.mirrors]`，在下方添加镜像加速器

```
vim crictl.yaml           #直接复制到当前目录修改好

155       [plugins."io.containerd.grpc.v1.cri".registry.mirrors]
156         [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]157            endpoint = ["https://docker.m.daocloud.io", "https://noohub.ru", "https://huecker.io", "https://dockerhub.timeweb.cloud"]
       
[root@master01 cluster-k8s]# ansible k8s -m copy -a 'src=config.toml dest=/etc/containerd'       
```

> 指定contaienrd接口文件地址，在k8s环境中，kubelet通过 `containerd.sock` 文件与containerd进行通信

```
[root@master01 cluster-k8s]# cat crictl.yaml    #名字不能变！
runtime-endpoint: unix:///var/run/containerd/containerd.sock
image-endpoint: unix:///var/run/containerd/containerd.sock
timeout: 10
debug: false

[root@master01 cluster-k8s]# ansible k8s -m copy -a 'src=crictl.yaml dest=/etc/'

#参数介绍
runtime-endpoint		//指定了容器运行时的sock文件位置
image-endpoint		//指定了容器镜像使用的sock文件位置
timeout				//容器运行时或容器镜像服务之间的通信超时时间
debug				//指定了crictl工具的调试模式,false表示调试模式未启用,true则会在输出中包含更多的调试日志信息，有助于故障排除和问题调试
```

> 启动containerd并设置随机自启

```
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'systemctl enable containerd --now'
```

> 如果有报错可以查看  会提示哪里报错

```
containerd config dump
```

# k8s集群部署方式

>kubernetes集群有多种部署方式，目前常用的部署方式有如下两种：

- kubeadm部署方式：kubeadm是一个快速搭建kubernetes的集群工具；

- 二进制包部署方式：从官网下载每个组件的二进制包，依次去安装，部署麻烦；

- 其他方式：通过一些开源的工具搭建，例如：sealos；

> 配置kubeadm仓库，本实验使用阿里云YUM源

```
cat k8s.repo 
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg

[root@master01 cluster-k8s]# ansible k8s -m shell -a'src=k8s.repo dest=/etc/yum.repos.d/'
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'yum clean all && yum makecache -y '
```

> **安装以下软件包：**

- kubeadm：用于初始化集群，并配置集群所需的组件并生成对应的安全证书和令牌；

- kubelet：负责与 Master 节点通信，并根据 Master 节点的调度决策来创建、更新和删除 Pod，同时维护 Node 节点上的容器状态；

- kubectl：用于管理k8集群的一个命令行工具；

```
dnf install -y kubeadm     #安装一个，其他俩个会被当成依赖自动安装，默认最新版本
```

> kubelet启用Cgroup控制组，用于限制进程的资源使用量，如CPU、

```
tee > /etc/sysconfig/kubelet <<EOF
KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"
EOF
```

> kubelet启用Cgroup控制组，用于限制进程的资源使用量，如CPU、内存 然后自启

```
[root@master01 cluster-k8s]# cat /etc/sysconfig/kubelet 
KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"
[root@master01 cluster-k8s]# ansible k8s -m copy -a 'src=./kubelet dest=/etc/sysconfig/'
[root@master01 cluster-k8s]# ansible k8s -m shell -a 'systemctl enable kubelet'

```

# 集群初始化

>在master01节点查看集群所需镜像文件

```
kubeadm config images list

#...以下是集群初始化所需的集群组件镜像
v1.27.1; falling back to: stable-1.23
k8s.gcr.io/kube-apiserver:v1.23.17
k8s.gcr.io/kube-controller-manager:v1.23.17
k8s.gcr.io/kube-scheduler:v1.23.17
k8s.gcr.io/kube-proxy:v1.23.17
k8s.gcr.io/pause:3.6
k8s.gcr.io/etcd:3.5.1-0
k8s.gcr.io/coredns/coredns:v1.8.6
```

> 在master01节点生成初始化集群的配置文件

```
kubeadm config print init-defaults > kubeadm-config.yaml
```

> 配置文件需要修改如下内容

```
#管理节点的IP地址
advertiseAddress: 192.168.3.121

#本机注册到集群后的节点名称
name: master01

#集群镜像下载地址，修改为阿里云
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
```

> 通过配置文件初始化集群

```
kubeadm init --config kubeadm-config.yaml 
```

> 根据集群初始化后的提示，执行如下命令

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

> 根据提示将node节点加入集群，加入成功后在master节点验证

```
[root@master01 ~]# kubectl get no
NAME       STATUS     ROLES           AGE   VERSION
master01   NotReady   control-plane   20m   v1.28.2
node1      NotReady   <none>          11m   v1.28.2
node2      NotReady   <none>          19m   v1.28.2
```

# 部署集群网络Calico

> Calico 和 Flannel 是两种流行的 k8s 网络插件，它们都为集群中的 Pod 提供网络功能。然而，它们在实现方式和功能上有一些重要区别：
>
> **网络模型的区别：**
>
> - Calico 使用 BGP（边界网关协议）作为其底层网络模型。它利用 BGP 为每个 Pod 分配一个唯一的 IP 地址，并在集群内部进行路由。Calico 支持网络策略，可以对流量进行精细控制，允许或拒绝特定的通信。
>
> - Flannel 则采用了一个简化的覆盖网络模型。它为每个节点分配一个 IP 地址子网，然后在这些子网之间建立覆盖网络。Flannel 将 Pod 的数据包封装到一个更大的网络数据包中，并在节点之间进行转发。Flannel 更注重简单和易用性，不提供与 Calico 类似的网络策略功能。
>
> **性能的区别：**
>
> - 由于 Calico 使用 BGP 进行路由，其性能通常优于 Flannel。Calico 可以实现直接的 Pod 到 Pod 通信，而无需在节点之间进行额外的封装和解封装操作。这使得 Calico 在大型或高度动态的集群中具有更好的性能。
>
> - Flannel 的覆盖网络模型会导致额外的封装和解封装开销，从而影响网络性能。对于较小的集群或对性能要求不高的场景，这可能并不是一个严重的问题。

> master01节点下载Calico文件

```
wget https://raw.githubusercontent.com/projectcalico/calico/v3.24.1/manifests/calico.yaml

vi calico.yaml
# 修改配置 文件CALICO_IPV4POOL_CIDR 参数 要与–pod-network-cidr 指定一致
- name: CALICO_IPV4POOL_CIDR
  value: "10.244.0.0/16"
#创建calico网络
kubectl apply -f calico.yaml 
#查看Calico Pod状态是否为Running
kubectl get pod -n kube-system

#会有点慢
```

# 验证集群节点状态 部署Nginx测试集群

```
在master01节点部署nginx程序测试
vim nginx-test.yml

apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.20.2
    ports:
    - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30002
```

> 查看Pod状态是否为Running

```

[root@master01 ~]# kubectl get pod
NAME                         READY   STATUS    RESTARTS   AGE
ng-deploy-65f87c8579-4zmv2   1/1     Running   0          2m19s
ng-deploy-65f87c8579-cgtzq   1/1     Running   0          2m19s
```

> 查看Service代理信息

```
[root@master01 ~]# kubectl  get svc
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP   40m
ng-svc       ClusterIP   10.107.218.212   <none>        80/TCP    2m49s
```

