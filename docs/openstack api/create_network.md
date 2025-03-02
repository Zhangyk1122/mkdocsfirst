> 创建 网络和子网

```
import json
import requests

def auth():
    auth_url = "http://192.168.100.10:5000/v3/auth/tokens"
    auth_data = {
        "auth": {
            "identity": {
                "methods":["password"],
                "password":{
                    "user": {
                        "name":"admin",
                        "domain": {"name": "demo"},
                        "password":'000000'
                    }
                }
            },
            "scope": {
                "project":{
                    "name":"admin",
                    "domain":{
                        "name":"demo"
                    }
                }
            }
        }
    }
    headers = {"Content-Type": "application/json"}
    headers['X-Auth-Token'] = requests.post(auth_url,headers=headers,data=json.dumps(auth_data)).headers['X-Subject-Token']
    return headers

headers=auth()
def network():
    data = {"network": {"router:external": True, "provider:network_type": "flat", "name": 'net-1', "provider:physical_network": "provider", "admin_state_up": True}}
    response = requests.post(url='http://192.168.100.10:9696/v2.0/networks',headers=headers,data=json.dumps(data))
    print(f'net-1创建成功')
    return response.json()


network_id = network()['network']['id']
def subnet():
    data = ({"subnet": {"name": "subnet-1", "enable_dhcp": False, "network_id": network_id, "allocation_pools": [{"start": "192.168.200.10", "end": "192.168.200.100"}],
                        "gateway_ip": "192.168.200.2", "ip_version": 4, "cidr": "192.168.200.0/24"}})
    requests.post(url='http://192.168.100.10:9696/v2.0/subnets',headers=headers,data=json.dumps(data))
    print('subnet-1创建成功')

subnet()




```

