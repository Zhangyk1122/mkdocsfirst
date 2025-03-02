官方文档
## OpenStack Heat模板的版本号，确保与OpenStack Heat服务兼容 
heat_template_version: 2015-10-15

## 模板的描述
description: Launch a basic instance with CirrOS image using the
             "m1.tiny" flavor, "mykey" key, and one network.

## 定义参数，这些参数可以在创建堆栈时提供值
parameters:
  ## 网络ID，用于实例的网络设置
  NetID:
    type: string
    description: Network ID to use for the instance.

## 定义资源，这些资源将在OpenStack中创建
resources:
  ## 定义一个名为server的资源，它的类型是OS::Nova::Server
  ## 这意味着我们将创建一个Nova服务器实例
  server:
    type: OS::Nova::Server
    # 资源的属性，这些属性将在创建实例时使用
    properties:
      # 用于创建实例的镜像，这里指定为CirrOS镜像
      image: cirros
      # 用于创建实例的虚拟机类型，这里指定为m1.tiny
      flavor: m1.tiny
      # 用于实例的密钥对，这里指定为mykey
      key_name: mykey
      # 实例将连接到的网络列表，这里使用NetID参数提供的网络ID
      networks:
        - network: { get_param: NetID }

## 定义输出，这些输出将在创建堆栈后提供值
outputs:
  ## 输出实例的名称
  instance_name:
    description: Name of the instance.
    value: { get_attr: [ server, name ] }
  ## 输出实例的IP地址
  instance_ip:
    description: IP address of the instance.
    value: { get_attr: [ server, first_address ] }


以下是各种资源的创建模板

Nova Resources：
OS::Nova::Server：创建虚拟机实例。

heat_template_version: 2014-10-16    2013-05-23 

resources:
  my_vm:
    type: OS::Nova::Server
    properties:
      image: "your_image_id"
      flavor: "your_flavor_id"
      key_name: "your_keypair_name"

openstack orchestration resource type list   查看资源类型


OS::Nova::Flavor：创建虚拟机实例类型。

heat_template_version: 2014-10-16

resources:
  my_custom_flavor:
    type: OS::Nova::Flavor
    properties:
      disk: 20           20G硬盘    
      ram: 4096           4G内存
      swap: 0           交换分区大小
      vcpus: 2               2个cpu

OS::Nova::Keypair：创建密钥对。
heat_template_version: 2014-10-16

resources:
  my_keypair:
    type: OS::Nova::Keypair
    properties:
      name: my-heat-keypair
      save_private_key: true


OS::Nova::SecurityGroup：创建安全组。
heat_template_version: 2014-10-16

resources:
  my_security_group:
    type: OS::Neutron::SecurityGroup
    properties:
      name: my-heat-security-group
      rules:          安全组规则列表
        - protocol: tcp              指定规则的协议类型。这里设置为 tcp
          port_range_min: 22   规则允许的端口的起始范围这里设置为 22表示规则的端口范围从 22 端口开始。
          port_range_max: 22  规则允许的端口的结束范围。这里同样设置为 22，与 port_range_min 相同，表示只允许单个端口 22
          remote_ip_prefix: 0.0.0.0/0  这意味着没有 IP 地址限制，任何地方的任何人都能够尝试通过 SSH 连接到设置了该安全组的虚拟机实例

OS::Nova::VolumeAttachment：将卷附加到虚拟机实例。
Neutron Resources：
OS::Neutron::Net：创建网络。
OS::Neutron::Subnet：创建子网。
heat_template_version: 2013-05-23     网络与子网结合
       
resources:  
  HeatNetwork:  
    type: OS::Neutron::Net  
    properties:  
      name: Heat-Network  
      shared: false   指定网络是否共享，这里设置为不共享

  HeatSubnet:  
    type: OS::Neutron::Subnet  
    properties:  
      network_id: { get_resource: HeatNetwork }  
      name: Heat-Subnet     子网的名称
      cidr: 10.20.2.0/24   IP 地址范围
      enable_dhcp: true   指定是否启用 DHCP 服务
      allocation_pools:      定义 IP 地址分配池，即 DHCP 服务器分配的 IP 地址范围
        - start: 10.20.2.20    起始地址
          end: 10.20.2.100    结束地址
      gateway_ip: 10.20.2.1   网关
      

OS::Neutron::Router：创建路由器。
heat_template_version: 2014-10-16

resources:
  my_network:
    type: OS::Neutron::Net
    properties:
      name: my-heat-network
      admin_state_up: true

  my_subnet:
    type: OS::Neutron::Subnet
    properties:
      network_id: { get_resource: my_network }
      cidr: 10.0.0.0/24
      ip_version: 4
      name: my-heat-subnet

  my_router:
    type: OS::Neutron::Router
    properties:
      name: my-heat-router
      external_gateway_info:
        network: public
      # Replace 'public' with the actual name or ID of the external network

  router_interface:
    type: OS::Neutron::RouterInterface
    properties:
      router_id: { get_resource: my_router }
      subnet_id: { get_resource: my_subnet }

OS::Neutron::Port：创建网络端口。
OS::Neutron::FloatingIP：创建浮动IP。
heat_template_version: 2014-10-16

resources:
  my_floating_ip:
    type: OS::Neutron::FloatingIP
    properties:
      pool: public
      # 指定浮动IP所在的地址池，这里使用默认的 'public' 地址池

Cinder Resources：
OS::Cinder::Volume：创建卷。
heat_template_version: 2014-10-16

resources:
  my_volume:
    type: OS::Cinder::Volume
    properties:
      size: 1
      # 指定卷的大小（GB）
      volume_type: None
      # 指定卷的类型，这里使用默认类型
      snapshot_id: None
      # 指定卷的快照ID，这里使用None，表示创建一个新卷而不是从快照创建
      source_volid: None
      # 指定源卷ID，这里使用None，表示创建一个新卷而不是从源卷复制
      source_replica: None
      # 指定源复制的ID，这里使用None，表示创建一个新卷而不是从源复制创建
      description: my-heat-volume
      # 指定卷的描述信息

OS::Cinder::Snapshot：创建卷快照。
OS::Cinder::VolumeAttachment：将卷附加到虚拟机实例。
Glance Resources：
OS::Glance::Image：创建镜像。
heat_template_version: 2014-10-16

resources:
  my_image:
    type: OS::Glance::Image
    properties:
      name: my-heat-image
      # 指定镜像的名称
      visibility: public
      # 指定镜像的可见性，可以是 public 或 private
      disk_format: qcow2
      # 指定镜像的磁盘格式，例如 qcow2 或 vhd
      container_format: bare
      # 指定镜像的容器格式，例如 bare 或 ovf
      min_disk: 0
      # 指定镜像启动所需的最小磁盘大小（GB）
      min_ram: 0
      # 指定镜像启动所需的最小内存大小（MB）
      protected: false
      # 指定镜像是否受保护，不能被删除

Keystone Resources：
OS::Keystone::User：创建用户。
heat_template_version: 2013-05-23

resources:
  my_user:
    type: OS::Keystone::User
    properties:
      name: my-heat-user
      # 指定用户的名称
      password: my-password
      # 指定用户的密码
      email: my-email@example.com
      # 指定用户的电子邮件地址
      enabled: true
      # 指定用户是否启用，默认是 true
      domain: demo
OS::Keystone::Project：创建项目。
heat_template_version: 2013-05-23

resources:
  my_project:
    type: OS::Keystone::Project
    properties:
      name: my-heat-project
      # 指定项目的名称
      description: My project description
      # 指定项目的描述信息
      domain: default
      # 指定项目所属的域（domain）

OS::Keystone::Domain：创建域。
heat_template_version: 2013-05-23

resources:
  my_domain:
    type: OS::Keystone::Domain
    properties:
      name: my-heat-domain
      # 指定域的名称
      description: My domain description
      # 指定域的描述信息

OS::Keystone::Role：创建角色。
heat_template_version: 2013-05-23

resources:
  my_role:
    type: OS::Keystone::Role
    properties:
      name: my-heat-role
      # 指定角色的名称
      description: My role description
      # 指定角色的描述信息

OS::Keystone::Service：创建服务。
heat_template_version: 2013-05-23

resources:
  my_service:
    type: OS::Keystone::Service
    properties:
      name: my-heat-service
      # 指定服务的名称
      description: My service description
      # 指定服务的描述信息
      domain: default
      # 指定服务所属的域（domain）
      type: identity
      # 指定服务的类型，这里是身份验证（identity）

OS::Keystone::Endpoint：创建端点。
Swift Resources:
OS::Swift::Container 创建容器
heat_template_version: 2013-05-23

resources:
  my_container:
    type: OS::Swift::Container
    properties:
      name: my-heat-container
      # 指定容器的名称
      description: My container description
      # 指定容器的描述信息

OS::Swift::Object       创建对象
heat_template_version: 2013-05-23

resources:
  my_object:
    type: OS::Swift::Object
    properties:
      container: my-heat-container
      # 指定对象将被上传到的容器名称
      content:
        # 指定要上传的文件内容，可以是字符串、base64编码的字符串或者是一个文件路径
        # 例如，如果上传一个文件，可以使用 get_file 函数
        # content:
        #   get_file: /path/to/file
        # 或者，如果你有文件内容作为字符串，可以使用 get_attr 函数
        # content:
        #   get_attr: [my_container, content]
        # 注意：这里需要确保 content 部分的内容是一个有效的 Swift 对象内容
      content_type: text/plain
      # 指定对象的 MIME 类型
      name: my-heat-object
      # 指定对象的名称

OS::Swift::Account    创建账户
这些资源类型可以组合使用，以创建复杂的堆栈配置。例如，你可以使用Nova和Neutron资源来创建一个具有特定网络配置的虚拟机实例堆栈。

请注意，不同的OpenStack版本可能会支持不同的资源类型。如果你的Heat模板与你的OpenStack版本不兼容，你可能需要更新模板以使用新的资源类型或修复任何不兼容的问题。







编写Heat模板create_network.yaml,创建名为Heat-Network网络,选择不共享;创建子网名为Heat-Subnet,子网网段设置为10.20.2.0/24,开启DHCP服务,地址池为10.20.2.20-10.20.2.100

heat_template_version: 2013-05-23  
    
resources:  
  HeatNetwork:  
    type: OS::Neutron::Net  
    properties:  
      name: Heat-Network  
      shared: false   指定网络是否共享，这里设置为不共享

  HeatSubnet:  
    type: OS::Neutron::Subnet  
    properties:  
      network_id: { get_resource: HeatNetwork }  
      name: Heat-Subnet     子网的名称
      cidr: 10.20.2.0/24   IP 地址范围
      enable_dhcp: true   指定是否启用 DHCP 服务
      allocation_pools:      定义 IP 地址分配池，即 DHCP 服务器分配的 IP 地址范围
        - start: 10.20.2.20    起始地址
          end: 10.20.2.100    结束地址
      gateway_ip: 10.20.2.1   网关
      


编写 Heat 模板create_flavor.yaml，创建名为“m2.flavor”、ID 为 1234、内存为 1024MB、硬盘为 20GB、vcpu数量为 1 的云主机类型

heat_template_version: 2013-05-23
resources:
my_custom_flavor:
type: OS::Nova::Flavor
properties:
name: m2.flavor
flavorid: "1234"
ram: 1024
disk: 20
vcpus: 1

## OpenStack Heat模板的版本号，确保与OpenStack Heat服务兼容
heat_template_version: 2016-04-08

## 定义资源，这些资源将在OpenStack中创建
resources:
  ## 定义一个名为chinaskills的资源，它的类型是OS::Keystone::Domain
  ## 这意味着我们将创建一个Keystone域
  chinaskills:
    type: OS::Keystone::Domain
    properties:
      # 域的名称
      name: chinaskills

  ## 定义一个名为beijing_group的资源，它的类型是OS::Keystone::Project
  ## 这意味着我们将创建一个Keystone项目
  beijing_group:
    type: OS::Keystone::Project
    properties:
      # 项目的名称
​      name: beijing_group
      # 项目所属的域，这里通过get_resource函数引用chinaskills域
​      domain: { get_resource: chinaskills }

  ## 定义一个名为cloud的资源，它的类型是OS::Keystone::User
  ## 这意味着我们将创建一个Keystone用户
  cloud:
    type: OS::Keystone::User
    properties:
      # 用户的名称
      name: cloud
      # 用户所属的域，这里通过get_resource函数引用chinaskills域
      domain: { get_resource: chinaskills }
      # 用户的密码
      password: 000000
      # 用户的默认项目，这里通过get_resource函数引用beijing_group项目
      default_project: { get_resource: beijing_group }
