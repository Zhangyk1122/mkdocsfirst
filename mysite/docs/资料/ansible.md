# ansible介绍

>ansible是一款开源自动化平台。一种简单的自动化语言或工具
>
>+ 简单明了
>+ 功能强大
>+ 无需代理
>
>管理节点通过ssh管理受管主机

# ansible工作流程

> 1. Host inventory（主机清单中）指定我们需要执行的主机范围，文件位置位于 `/etc/ansible/hosts`
> 2. Playbook（剧本）文件中确定要对目标主机做的事情，如创建文件、复制文件、安装服务等。
> 3. 调用模块（Core Modules）中的模块，如要创建或删除文件调用 `file` 模块，复制调用 `copy` 模块，安装服务应用调用 `yum` 模块等。
> 4. 将前三步加载到Ansible模块里。
> 5. Ansible将收到的前三步编译成自己的语言打包发送给连接插件（Connection Plugins）
> 6. 连接插件（Connection Plugins）发送给连接的主机/被管理端
> 7. 主机（Host）主机执行playbook中调用模块产生的动作，如批量安装apache web服务 `yum install httpd -y`

# 学习环境

| ansible-master | 192.168.3.121 |
| :------------: | ------------- |
| ansible-node1  | 192.168.3.122 |
| ansible-node2  | 192.168.3.123 |

| test 组       | dev           |
| ------------- | ------------- |
| ansible-node1 | ansible-node2 |

# 安装

> 由于我的系统是rocky linux 9 的最小安装，需要安装拓展包来安装ansible

```
dnf install -y epel-release
#用于在基于Red Hat的系统（如Rocky Linux、AlmaLinux、CentOS等）上安装EPEL（Extra Packages for Enterprise Linux）仓库

dnf makecache

dnf install -y ansible
```





# 配置文件

> vim /etc/ansible/hosts

```
[test]                 #配置组名
192.168.3.122          #组下面的ip
[dev]
192.168.3.123
```

> ssh免密

```
# 需要提前设置ssh免密，不然后面登录需要密码

ssh-keygen
ssh-copy-id root@192.168.3.122
ssh-copy-id root@192.168.3.123
```

# 查看模块帮助文档

```
ansible-doc 模块名称   #看完语法可以直接查所需模块的例子
ansible-doc yum
```

# 语法格式

> 两种任务执行模式
>
> 1. ad-hoc:该模式相当于你在命令行执行命令，任何命令都是一次性的，下次执行还需要重新打一次
> 2. playbook: 该模式相当于你把命令组织到文件里面，后续可以反复执行





```
[root@master01 cluster-k8s]# ansible k8s -m copy -a "src=./hosts dest=/etc/hosts" 
ansible: 这是 Ansible 的命令行工具，用于执行各种自动化任务。

k8s: 这是你在 Ansible 中定义的一个主机组的名称。Ansible 会根据这个组名找到对应的主机列表，并在这些主机上执行任务。

-m copy: -m 选项用于指定要使用的 Ansible 模块。这里使用的是 copy 模块，它的功能是将文件从控制节点复制到目标节点。

-a "src=./hosts dest=/etc/hosts" -a 选项用于传递模块的参数。这里传递给 copy 模块的参数是：

src=./hosts: 指定源文件的路径。./hosts 表示当前目录下的 hosts 文件。

dest=/etc/hosts: 指定目标路径。/etc/hosts 表示目标节点上的 /etc/hosts 文件


# 结果黄色表示成功，绿色表示没有对主机进行操作，红色报错
```





```
$ vim playbook/apache.yml
---            # yaml文件的开头，证明他是一个yaml文件
- name: web    #指定play的名称
  hosts: all   # 指定管理哪些主机或组
  tasks:
    - name: install the latest version of Apache # 模块描述
      yum:
        name: httpd # 模块名称
        state: latest # 状态，present安装，absent删除，latest更新到最新版本
```

```
[root@ansible-master ~]# cat http.yaml 
---
- name: web
  hosts: all      #跟上面一样 hosts:all ,表示全部主机
  tasks:
    - name: install Apache
      yum:
        name: httpd
        state: latest

```





 

 