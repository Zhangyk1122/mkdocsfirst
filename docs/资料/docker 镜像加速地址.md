---
title: My Secret Page
encrypt: true
password: "zyk4321."
---



### 删除旧版docker

```
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```



### docker 安装

```
# docker-ce.repo
cat > /etc/yum.repos.d/docker-ce.repo <<eof
[edge]
name=edge
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/7.9/x86_64/edge/
gpgcheck=0
enabled=1
[nightly]
name=nightly
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/7.9/x86_64/nightly/
gpgcheck=0
enabled=1
[stable]
name=stable
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/7.9/x86_64/stable/
gpgcheck=0
enabled=1
[test]
name=test
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/7.9/x86_64/test/
gpgcheck=0
enabled=1
eof
```

```
yum list docker-ce --showduplicates
yum clean all && yum repolist
yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

- **docker-ce**：Docker社区版，包含Docker引擎。
- **docker-ce-cli**：Docker命令行工具。
- **containerd.io**：容器运行时，管理容器生命周期。
- **docker-compose-plugin**：用于定义和运行多容器应用。



> dcoker 镜像加速地址 #/etc/docker/daemon.json

### 镜像加速

```
{
  "registry-mirrors": [
    "https://reg-mirror.qiniu.com/",
    "https://docker.mirrors.ustc.edu.cn/",
    "https://hub-mirror.c.163.com/",
    "https://docker.1ms.run",
    "https://hub.mirrorify.net",
    "https://young-sky.nooa.tech/"
  ]
}
```
