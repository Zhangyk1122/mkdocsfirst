> 创建flavor

```
import json
import requests


def auth():
    auth_url = "http://192.168.100.10:5000/v3/auth/tokens"
    auth_data = {
        "auth": {
            "identity": {
                "methods": ["password"],
                "password": {
                    "user": {
                        "name": 'admin',
                        "domain": {"name": 'demo'},
                        "password": '000000'
                    }
                }
            },
            "scope": {
                "project": {
                    "name": 'admin',
                    "domain": {
                        "name": 'demo'
                    }
                }
            }
        }
    }
    headers = {"Content-Type": "application/json"}
    headers['X-Auth-Token']=requests.post(auth_url, headers=headers, data=json.dumps(auth_data)).headers['X-Subject-Token']
    return headers

headers = auth()

# 尝试删除已存在的flavor
res = requests.get(url='http://192.168.100.10:8774/v2.1/flavors', headers=headers)
flavors = res.json()['flavors']
name = 'test1'
for flavor in flavors:
    if flavor['name'] == name:
        delete_url = f"http://192.168.100.10:8774/v2.1/flavors/{flavor['id']}"
        response = requests.delete(delete_url, headers=headers)
        print('同名实例删除成功')
        break

        # 创建新的flavor
flavor_data = {"flavor": {"vcpus": 2,"disk": 20,"name": "test1","os-flavor-access:is_public": True,"rxtx_factor": 1.0,"OS-FLV-EXT-DATA:ephemeral": 0,"ram": 1024,"swap": 0}}
res = requests.post(url='http://192.168.100.10:8774/v2.1/flavors', headers=headers, data=json.dumps(flavor_data))

if res.status_code == 201:
    new_flavor_id = res.json()['flavor']['id']
    print(f'实例创建成功,新flavor ID: {new_flavor_id}')
else:
    print(f'实例创建失败,失败状态码为{res.status_code}')
```

