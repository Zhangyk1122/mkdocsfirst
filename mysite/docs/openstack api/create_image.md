>image

```
#获取token 方法 /usr/lib/python2.7/site-packages/glance/common/auth.py 199行

import json
import requests


def auth():
    auth_url = 'http://11.0.1.100:5000/v3/auth/tokens'
    auth_body = {
        "auth": {
            "identity": {
                "methods": ["password"],
                "password": {
                    "user": {
                        "name": 'admin',
                        "domain": {"name": "demo"},
                        "password": '000000'
                    }
                }
            },
            "scope": {
                "project": {
                    "name": 'admin',
                    "domain": {
                        "name": "demo"
                    }
                }
            }
        }
    }

    headers = {'Content-Type': 'application/json'}
    headers['X-Auth-Token'] = requests.post(auth_url, headers=headers, data=json.dumps(auth_body)).headers['X-Subject-Token']
    return headers


headers = auth()
image_url = 'http://11.0.1.100:9292/v2/images'
name = 'cirros2'

# 删除同名镜像
res = requests.get(image_url, headers=headers)
images = res.json()['images']
for image in images:
    if image['name'] == name:
        delete_url = f"{image_url}/{image['id']}"
        requests.delete(delete_url, headers=headers)
        print("相同镜像已经删除")
        break

# 创建新镜像
image_body = {"min_disk": 20, "container_format": "bare", "min_ram": 1024, "disk_format": "qcow2", "name": name}
res = requests.post(image_url, data=json.dumps(image_body), headers=headers)
print(json.dumps(res.json(),indent=4))

if res.status_code == 201:
    image_id = res.json()['id']
    image_put_url = f"{image_url}/{image_id}/file"
    headers["Content-Type"] = "application/octet-stream"
    res=requests.put(image_put_url, data=open('/root/cirros-0.3.4-x86_64-disk.img', 'rb').read(), headers=headers)
    if res.status_code == 204:
        print(f"镜像创建成功\n镜像ID为:{image_id}")
        image_info= requests.get(f'{image_url}/{image_id}',headers=headers).json()
        print(json.dumps(image_info,indent=4))
        with open(f"{name}.json",'w') as f:
            json.dump(image_info, f, indent=4)
    else:
        print(f"上传镜像文件失败, 状态码为{res.status_code}")
```

