---
title: My Secret Page
encrypt: true
password: "zyk4321."
---



## 删除旧版docker

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





## docker 安装

```
yum install -y yum-utils device-mapper-persistent-data lvm2  # 安装依赖
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

- **docker-ce**：Docker社区版，包含Docker引擎。
- **docker-ce-cli**：Docker命令行工具。
- **containerd.io**：容器运行时，管理容器生命周期。
- **docker-compose-plugin**：用于定义和运行多容器应用。



> dcoker 镜像加速地址 #/etc/docker/daemon.json

## 镜像加速

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

## docker基础

### 1. 什么是 Docker

- **简介**：
  Docker 是一个开源的容器引擎，用于构建、部署和管理应用程序及其依赖服务。
- **起源**：
  - 2010 年由 **Dotcloud 公司创始人 Solomon Hykes** 发起（使用 Go 语言开发，最初在 Ubuntu 12.04 上实现）。
  - 2013 年 3 月开源，代码托管在 GitHub，后加入 Linux 基金会并成立“开放容器联盟”。
- **注意**：
  Docker 推荐优先安装在 Linux 系统上，Windows 需通过 Hyper-V + Docker Desktop 支持（性能受限）。

------

### 2. Docker 与传统虚拟技术对比

| **特性**       | **容器**           | **虚拟机** |
| :------------- | :----------------- | :--------- |
| **启动**       | 秒级               | 分钟级     |
| **硬盘使用**   | 一般为 MB          | 一般为 GB  |
| **性能**       | 接近原生           | 弱于原生   |
| **系统支持量** | 单机支持上千个容器 | 一般几十个 |

- **核心区别**：
  - **传统虚拟机**：虚拟硬件 + 完整操作系统，应用运行在虚拟系统中。
  - **容器**：共享宿主内核，无硬件虚拟化，直接运行应用（更轻量）。

------

### 3. 仓库（Registry）

- **作用**：集中存储、分发镜像的服务。
- **Docker Hub**：官方远程仓库地址 https://hub.docker.com/。

------

### 4. 镜像（Image）

- **定义**：包含程序、库、配置、环境变量等的只读模板，用于创建容器。

#### 4.1 搜索镜像

```
docker search 镜像名 --limit 5 --no-trunc
```

#### 4.2 查看镜像

```
docker images
```

#### 4.3 下载镜像

```
docker pull 镜像名:版本
```

#### 4.4 删除镜像

```
docker rmi 镜像名:版本  # 删除未运行过的镜像
docker rmi -f 镜像ID   # 强制删除镜像（不删除关联容器）
```

------

### 5. 容器（Container）

- **与镜像关系**：类似面向对象编程中**类（镜像）\**和\**对象（容器）**。

#### 5.1 查看容器

```
docker ps -a  # 查看所有容器（含已停止的）
```

#### 5.2 运行容器

```
docker run --name 容器名 -itd 镜像名
```

- **参数说明**：
  - `-i`：交互模式；`-t`：分配伪终端；`-d`：后台运行。
  - 若本地无镜像会自动从远程仓库下载。

#### 5.3 进入容器

```
docker exec -it 容器名或ID /bin/bash
```

#### 5.4 停止容器

```
docker stop 容器名  # 优雅停止
docker kill 容器名  # 强制终止
```

#### 5.5 删除容器

```
docker rm 容器名      # 删除已停止的容器
docker container prune -f  # 清理所有停止的容器
```

## Dockerfile 基础

#### 1. 什么是 Dockerfile？

- **定义**：文本文件，包含一组指令，用于自动化构建 Docker 镜像。
- **作用**：定义镜像的组成、环境配置、依赖安装等步骤。

------

#### 2. Dockerfile 核心指令

| 指令                             | 说明                                                         |
| :------------------------------- | :----------------------------------------------------------- |
| `FROM <基础镜像>` `从<基础映像>` | **必选**，指定基础镜像（如 `FROM ubuntu:22.04`）。           |
| `WORKDIR <路径>` `工作台<路径>`  | 设置工作目录（后续指令默认在此目录执行）。                   |
| `COPY <源> <目标>`               | 复制宿主机文件/目录到镜像中（支持通配符）。                  |
| `ADD <源> <目标>`                | 类似 `COPY`，但支持自动解压压缩包和远程 URL（慎用）。        |
| `RUN <命令>`                     | **执行命令**并提交结果到镜像（如安装软件：`RUN apt-get update`）。 |
| `ENV <变量名=值>`                | 设置环境变量（可被后续指令或容器运行时使用）。               |
| `EXPOSE <端口>` `暴露< >`        | 声明容器运行时监听的端口（需配合 `docker run -p` 映射到宿主机）。 |
| `CMD ["命令", "参数"]`           | **容器启动时默认执行的命令**（只能有一个，可被 `docker run` 覆盖）。 |
| `ENTRYPOINT ["命令"]`            | 类似 `CMD`，但不会被覆盖（常与 `CMD` 组合使用）。            |
| `USER <用户>`                    | 指定后续指令的执行用户（如 `USER root` 或 `USER appuser`）。 |
| `VOLUME <路径>`                  | 定义数据卷挂载点（持久化数据）。                             |

------

#### 3. 示例 Dockerfile

dockerfile Dockerfile文件

```
# 基于 Ubuntu 22.04 构建
FROM ubuntu:22.04

# 设置工作目录
WORKDIR /app

# 安装依赖
RUN apt-get update && apt-get install -y python3

# 复制本地文件到镜像
COPY requirements.txt .
COPY app.py .

# 安装 Python 依赖
RUN pip install -r requirements.txt

# 声明端口
EXPOSE 8080

# 容器启动命令
CMD ["python3", "app.py"]
```

------

#### 4. 构建与运行

1. **构建镜像**：

   ```
   docker build -t my-app:1.0 .  # -t 指定镜像名和标签，`.` 表示当前目录
   ```

2. **运行容器**：

   ```
   docker run -d -p 8080:8080 --name my-container my-app:1.0
   ```

------

#### 5. 最佳实践

1. **精简镜像**：
   - 使用轻量级基础镜像（如 `alpine`）。
   - 合并多个 `RUN` 指令减少层数（用 `&&` 连接命令）。
2. **安全优化**：
   - 避免使用 `root` 用户运行应用（通过 `USER` 切换非特权用户）。
   - 敏感数据（如密码）通过环境变量或 `docker run --env` 传入。
3. **缓存利用**：
   - 将不常变动的指令（如依赖安装）放在 Dockerfile 前面。
   - 频繁变动的步骤（如代码复制）放在后面。

------

#### 6. 扩展知识

多阶段构建

```

# 构建阶段
FROM python:3.9 as builder
COPY . .
RUN pip install --user -r requirements.txt

# 运行阶段
FROM python:3.9-slim
COPY --from=builder /root/.local /root/.local
COPY app.py .
CMD ["python", "app.py"]
```





------

整理说明：

- 仅包含基础内容，未新增高级特性（如 ARG、HEALTHCHECK）。
- 修正格式并优化示例代码的易读性。
