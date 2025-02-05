> 创建用户



```
import json
import requests

def auth():
    auth_url='http://11.0.1.100:5000/v3/auth/tokens'
    auth_body = {
        "auth": {
            "identity": {
                "methods": ["password"],
                "password": {
                    "user": {
                        "name": 'admin',
                        "domain": {'name': 'demo'},
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

    headers = {'Content-Type': 'application/json'}
    headers['X-Auth-Token']=requests.post(auth_url,headers=headers,data=json.dumps(auth_body)).headers['X-Subject-Token']
    return headers

headers=auth()
user_url= 'http://11.0.1.100:5000/v3/users'
data={'user':{'name':'test12','password':'12345678','domain':'demo'}}
response=requests.post(url=user_url,headers=headers,data=json.dumps(data))
if response.status_code == 201:
    print('用户创建成功')
    new_user_id = response.json()['user']['id']
    print(f'新用户ID：{new_user_id}')
else:
    print('用户创建失败')


```

