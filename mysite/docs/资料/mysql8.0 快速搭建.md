# mysql8.0 快速搭建

# 安装mysql8.0仓库

```
tee /etc/yum.repos.d/mysql-8.0.repo <<EOF
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=https://repo.mysql.com/yum/mysql-8.0-community/el/9/x86_64/
enabled=1
gpgcheck=0
EOF
```

> 可以查看数据库的具体的版本

```
dnf search mysql-community-server --showduplicates | grep 8.0
```

> 安装8.0版本

```
dnf install -y mysql-community-server-8.0.30-1.el9.x86_64
```

> 启动数据库

```
systemctl enable mysqld --now
```

> 过滤数据库初始root密码

```
grep "password" /var/log/mysqld.log
```

> 使用初始密码登录

```
mysql -u root -p"9VZ<oQcwi=qL"
```

> 修改数据库root密码

```
mysql> alter user root@"localhost" identified by "Admin123...";
```

> 退出数据库用新密码登录

```
mysql -uroot -p'Admin123...'
```

