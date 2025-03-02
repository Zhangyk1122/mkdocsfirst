> 阿里云yum源



```
[base]
name=CentOS-$releasever - Base - Aliyun
baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/
gpgcheck=0
gpgkey=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/RPM-GPG-KEY-CentOS-7

[updates]
name=CentOS-$releasever - Updates - Aliyun
baseurl=http://mirrors.aliyun.com/centos/$releasever/updates/$basearch/
gpgcheck=0
gpgkey=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/RPM-GPG-KEY-CentOS-7

[extras]
name=CentOS-$releasever - Extras - Aliyun
baseurl=http://mirrors.aliyun.com/centos/$releasever/extras/$basearch/
gpgcheck=0
gpgkey=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/RPM-GPG-KEY-CentOS-7

[epel]
name=Extra Packages for Enterprise Linux 7 - $basearch - Aliyun
baseurl=http://mirrors.aliyun.com/epel/7/$basearch
failovermethod=priority
enabled=1
gpgcheck=0
gpgkey=http://mirrors.aliyun.com/epel/RPM-GPG-KEY-EPEL-7
```






> 可以实现xshell 安装单个软件 

```
apt install lrzsz
```



helm 一键安装

```
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

