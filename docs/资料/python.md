### 第二天

1.编程语言中为什么要使用变量
**使用变量是存储特定的数据**
2.Python中如何定义变量，变量的命名有什么规范
**变量一般以英文命名，在python定义变量也简单**
  **a = 20**
  **name= zhangsan**

3.编程语言中，逻辑控制的三大支柱是什么
**编程语言中的逻辑控制主要依赖于三种结构：顺序结构、选择结构（分支结构）和循环结构。**
4.Python中 数字类型和字符串类型有什么区别

```
数字类型：包括整数（int）、浮点数（float）和复数（complex）。它们用于表示数值，并支持数学运算。
字符串类型（str）：用于表示文本数据，由一系列字符组成。字符串支持拼接、切片等操作，但不支持数学运算。5.Python中还有哪些类型。
布尔值、列表、元组、字典、集合
```

1.如何表示一个字符串

```
 str = ‘hello word’   字符串需要加引号*
```

2.使用双引号和单引号有什么区别
没有多大区别，同样是表示字符串，不过在一段字符串里面有引号的话，外面的字符就需要双引号包裹

```
str = "hello 'word' "
```

3.如何拼接两个字符串
**可以使用加号进行, str 1 = 'hello'  str 2 ='word'**

**str 3 = str 1 + str 2**   

**print(str 3)**

4.什么是字符串占位符

**字符串占位符是一种在字符串中预留位置的方法，可以在后续用具体的值替换这些位置**

5.Python中有几种方式实现字符串占位符

**常用的占位符有 `%s`（字符串）、`%d`（整数）等**

计算:
1.python中的数字类型支持哪些常用的基础计算方式

**Python中的数字类型支持加（+）、减（-）、乘（*）、除（/）、取模（%）、幂（**）等基础计算方式。**

2.判断一个数字能否被2整除，需要使用哪种计算方式

```python
num = 2
nums = 10
a = nums % num
print(a)
```

3.如何让数字类型的变量值自增1，比如a=2，如何让a的值变为了(要求你写的语句，在初始a=5的时候，能够让a=6)

```python
a = 5
a += 1
print(a)  
```

对列表的一系列问题
1.Python中的列表是什么，跟单独的一个变量有什么区别。

**列表是一种有序的集合，可以随时添加和删除其中的元素。列表可以包含不同类型的元素。与单独的变量相比，列表可以存储多个值，并且可以通过索引来访问这些值。**

2.如何定义一个列表。  使用括号

```
my_list = [1, 2, 3, "hello", "world"]
```

3.在Python中，列表中的内容一般会被称为什么

**列表中的内容被称为元素**

4.如何获取列表的长度   可以使用内置函数 `len()` 来获取列表的长度。例如

```
my_list = [1, 2, 3, "hello", "world"]
length = len(my_list)
print(length)  
```

5.什么是列表的下标，下标从几开始。

**列表的下标用于标识列表中的每个元素的位置。在Python中，下标从0开始**

6.如何在列表中添加一个元素 

可以使用 `append()` 方法在列表末尾添加一个元素

```
my_list = [1, 2, 3]
my_list.append(4)
print(my_list)  # 输出: [1, 2, 3, 4]
```

7.如何在列表的任意位置插入元素

**可以使用 `insert()` 方法在列表的指定位置插入元素**

```
my_list = [1, 2, 3]
my_list.insert(1, 4)
print(my_list)  # 输出: [1, 4, 2, 3]
```

8.如何删除列表中的元素

可以使用 `remove()` 方法删除列表中的指定元素

```
my_list = [1, 2, 3, 4]
my_list.remove(2)
print(my_list)  
```

9.如何修改指定位置元素的值循环和判断的问题

可以直接通过下标来修改列表中指定位置的元素值

```
my_list = [1, 2, 3]
my_list[1] = 4
print(my_list)  
输出: [1, 4, 3]
```

1.为一个变量赋值一个数字，对变量进行判断输出此值是大于还是小于或者等于8

```
num = 10
if num > 8:
    print("大于8")
elif num < 8:
    print("小于8")
else:
    print("等于8")
```

2.如何依次输出列表中的元素

```
my_list = [1, 2, 3, 4, 5]
for item in my_list:
    print(item)
```

3.如何从1输出到100，如何只输出偶数，或者奇数。

```
for i in range(2, 101, 2): #偶数
    print(i)
```

4.使用for循环输出1到9

```
for i in range(1, 10):
    print(i)
```

5.在for循环中嵌套for循环，输出9次 1到9

```
for i in range(1, 10):
    for j in range(1, 10):
        print(j, end=" ")
    print()
```



### 第三天

字典相关内容：
\1. 什么是字典

在 Python 中，**字典（dictionary）** 是一种可变、无序的键值对集合。每个元素由一个“键”和一个“值”组成，用于快速查找、存储数据。

\2. 如何理解键值对

- **键（key）**：用于唯一标识一个值。
- **值（value）**：与键关联的数据。

键必须是不可变类型（如字符串、数字、元组），而值可以是任意类型。

\3. 使用python定义一个字典，包含三个值：name（小明）、age（18）和city（BeiJing）。

```
person = {"name": "小明", "age": 18, "city": "BeiJing"}
```

\4. 如何在字典中增加一个键值对，比如为上述字典增加一个电话号码的键值对。

```
#给上述添加电话
person["phone"] = "123456789"
```

\5. 如何更改字典中某个键的值，比如修改年龄为20

```
person["age"] = 20
```

\6. 如何删除字典中的某个键值对，比如删除城市

```
del person["city"]
```

\7. 遍历字典输出所有键值对

```
for key, value in person.items():
    print(f"{key}: {value}")
```

完成以上内容后，我们已经具备完成第一阶段目标的所有基础知识了。剩下的就是一些技巧和逻辑了。需要先对需求进行拆分。
99乘法表的规律是什么？
\1. 99乘法表中哪些内容是变化的，哪些内容是固定的

- **变化的**：行号（第一个数）、列号（第二个数）
- **固定的**：格式为 `i * j = i*j`，且范围是1~9

\2. 这些变化的内容有什么规律，如何实现

- 第一层循环控制行（从1到9）
- 第二层循环控制列（从1到当前行

\3. 使用循环输出1-9的值。

```
for i in range(1, 10):
    print(i)
```

\4. 在第一个循环中嵌套第二个循环，要求第二个循环只输出大于等于第一个循环的数字，最大值为9。

```
for i in range(1, 10):
    for j in range(i, 10):
        print(j, end=" ")
    print()
```

\5. 计算第一个循环和第二个循环的乘积。

```
for i in range(1, 10):
    for j in range(i, 10):
        print(f"{i}*{j}={i*j}", end="\t")
    print()
```

扑克牌的内容有什么规律？
\1. 使用循环输出四种花色

```
suits = ["♠", "♥", "♦", "♣"]
for suit in suits:
    print(suit)
```

\2. 在第一个循环中嵌套第二个循环，输出A-K，并以字符串方式拼接第一个循环中的花色

```
ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
suits = ["♠", "♥", "♦", "♣"]
for suit in suits:
    for rank in ranks:
        print(f"{suit}{rank}")
```

\3. 输出大王和小王。

```
print("小王", end='')
print("大王")
```

### 第四天

\1. 元组是什么

元组是不可变，有序的序列容器，用 () 表示

\2. 什么是函数

函数是封装特定功能的代码块，通过 def 定义。可重复调用，提高代码复用性

\3. 什么是参数

参数是函数定义时接收外部数据的占位变量

\4. 什么是形参，什么是实参

形参: 函数中定义的变量，例如： def func(a,b) 中的ab

实参: 调用函数时传入的具体值，例如： def func(1,2)中的1 2 

\5. 函数如何返回值

使用 `return` 语句返回结果。无 `return` 时默认返回 `None`。

```
def add(x, y):
    return x + y  # 返回计算结果
result = add(2, 3)  # result = 5
```

\6. 将99乘法表制作为函数，要求有2个参数，两个参数分别控制乘法表的最大乘数和最大被乘数。

```
def multiplication_table(max_row, max_col):
    for i in range(1, max_row + 1):
        for j in range(1, max_col + 1):
            print(f"{i}×{j}={i*j}", end="\t")
        print()  

multiplication_table(3, 5) 
```

\7. input是如何使用的？试着使用input输出参数传递给99乘法表的函数

```
def multiplication_table(max_row, max_col):
    for i in range(1, max_row + 1):
        for j in range(1, max_col + 1):
            print(f"{i}×{j}={i*j}", end="\t")
        print()

# 通过input获取参数
rows = int(input("输入最大行数: "))     # 用户输入转为整数
cols = int(input("输入最大列数: "))
multiplication_table(rows, cols)

输入最大行数: 2
输入最大列数: 3
1×1=1	1×2=2	1×3=3	
2×1=2	2×2=4	2×3=6	
```

\8. 默认print会自动换行，如何让print不自动换行

```
print("不换行", end=" ")  
print("继续输出")        
```

\9. 打印列表时，如何倒序打印，就是先输出字典最后一位，最后输出字典的第一位

```
my_list = [1, 2, 3, 4]
print(my_list[::-1])  # 输出: [4, 3, 2, 1]
```

\10. 如何列表进行去重,使用set

```
lst = [3, 1, 2, 1, 4]
unique = list(set(lst))
print(unique)
```

\11. 单个下划线是否可以作为变量名称，什么情况下会使用这种方式

```
x, _, y = (1, 2, 3)  # 忽略第二个值
print(x, y)
#临时变量
for _ in range(3):
    print("Hello")
```

\12. 比如列表为['小明',18,'BeiJing']，如何快速为每个元素单独设置变量名

```
data = ['小明', 18, 'BeiJing']
name, age, city = data
print(name,age)
```

\13. 什么是深拷贝，什么是浅拷贝，什么情况下使用

| 类型   | 特点                           | 使用场景                   | 方法              |
| :----- | :----------------------------- | :------------------------- | :---------------- |
| 浅拷贝 | 只复制顶层对象（嵌套对象共享） | 简单对象修改               | `copy.copy()`     |
| 深拷贝 | 递归复制所有嵌套对象           | 需要完全独立副本的嵌套结构 | `copy.deepcopy()` |

```
import copy
lst = [[1, 2], [3, 4]]
shallow = copy.copy(lst)
deep = copy.deepcopy(lst)
print(shallow)
print(deep)
```

\14. 列表是有序的还是无需的

**列表(List)**：有序（元素按插入顺序存储）

\15. 字典是有序的还是无需的

- **元组(Tuple)**：有序
- **字典(Dict)**：Python 3.7+ 有序（按插入顺序）
- **集合(Set)**：无序

\16. 集合是什么

集合是 **无序、不重复** 元素的容器，用 `{}` 定义。用于去重和集合运算（交集、并集）

```
s = {1, 2, 3}
s.add(4)  # 增
```

\17. 列表、字典、集合、元组的区别是什么，做表格进行对比。在什么场景下使用

| 类型 | 可变性 | 有序性 | 重复元素 | 使用场景               |
| :--- | :----- | :----- | :------- | :--------------------- |
| 列表 | 可变   | 有序   | 允许     | 动态数据集合           |
| 元组 | 不可变 | 有序   | 允许     | 常量数据（如坐标）     |
| 字典 | 可变   | 有序*  | 键不允许 | 键值映射（如JSON数据） |
| 集合 | 可变   | 无序   | 不允许   | 去重/集合运算          |

> *注：Python 3.7+ 字典有序

\18. 列表、字典、集合、元组的增删改查，怎么操作

#### 列表操作

```
lst = [1, 2]
lst.append(3)       # 增: [1, 2, 3]
lst[1] = 20         # 改: [1, 20, 3]
del lst[0]          # 删: [20, 3]
print(lst[0])       # 查: 20
```

#### 字典操作

```
d = {"a": 1}
d["b"] = 2          # 增: {"a":1, "b":2}
d["a"] = 10         # 改: {"a":10, "b":2}
del d["b"]          # 删: {"a":10}
print(d.get("a"))   # 查: 10
```

#### 集合操作

```
s = {1, 2}
s.add(3)            # 增: {1, 2, 3}
s.remove(1)         # 删: {2, 3}
# 集合元素不可直接修改，需先删后增
print(2 in s)       # 查: True
```

#### 元组操作

```
t = (1, 2)
# 元组不可变！只能查询
print(t[0])         # 查: 1
```



### 第五天

\1. 如何使用python创建文件，并写入内容

```
with open('example.txt', 'w') as f:    #默认在当前路径
    f.write("Hello, World!")
```

\2. 如何写入时先清空文件内容

```
# 使用 'w' 模式会自动清空文件
with open('example.txt', 'w') as f:
    f.write("New content")
```

\3. 如何写入时不清空内容，而是追加内容

```
with open('example.txt', 'a') as f:    # a追加内容
    f.write("\nAppended text")
```

\4. python中如何定义一个多行文本。

```
multi_line_text = """Line 1          #6个引号，双引号单引号都可以
Line 2
Line 3"""
```

\5. 如何替换文本中的字符串，比如把字符串aaabbcc中的aaa替换为xxx

```
text = "aaabbcc"
new_text = text.replace("aaa", "xxx") #replace替换
# 结果: "xxxbbcc"
```

\6. 如何读取一个文本文件

```
with open('example.txt', 'r') as f:   #r只读
    content = f.read()
```

\7. 如何将文本文件中的内容读取为列表，每一行是一个元素

```
with open('example.txt', 'r') as f:
    lines = f.readlines()  # 每行包含换行符
```

\8. 字符串类型的数字，如何转换为数字类型

```
num_int = int("42")     # 整数
num_float = float("3.14")  # 浮点数
```

\9. 如何把数字类型转换为字符串

```
num_str = str(42)      # "42"
float_str = str(3.14)  # "3.14"
```

\10. 同一个列表中可以存在不同类型的变量吗？其他编程语言是否可以

```
mixed_list = [1, "text", True, 3.14]  # Python允许
# Java/C++等强类型语言通常不允许
```

\11. 什么是弱语言类型，什么是强语言类型，python属于哪种

- **强类型**：变量类型固定（Python、Java）
- **弱类型**：允许隐式类型转换（JavaScript、PHP）
- **Python**：强类型 + 动态类型

\12. 如何判断一个变量的类型是什么

```
x = 3.14
print(type(x))  #type即可打印变量类型，浮点数
```

\13. Python有哪些常用内置库，什么场景下使用

| 库名       | 用途         |
| :--------- | :----------- |
| `os`       | 操作系统交互 |
| `sys`      | 系统参数操作 |
| `math`     | 数学运算     |
| `datetime` | 日期时间处理 |
| `json`     | JSON数据解析 |
| `re`       | 正则表达式   |
| `random`   | 随机数生成   |

\14. 使用Python获取当前工作目录，切换目录，创建、删除、重命名目录

```
import os

print(os.getcwd())                # 当前目录
#手动新建test目录
os.chdir('./test')# 切换目录
print(os.getcwd())
os.mkdir('new_dir')               # 创建目录
os.rename('new_dir', 'old_dir')   # 重命名
os.rmdir('empty_dir')             # 删除空目录
#根据需求注释
```

\15. 使用Python获取环境变量，新增环境变量，修改环境变量，删除新增的环境变量。

```
import os

print(os.environ.get('PATH'))     # 获取变量
os.environ['NEW_VAR'] = 'value'   # 新增/修改
del os.environ['NEW_VAR']         # 删除
# 注意：修改仅影响当前进程
```

\16. 使用Python输出一个随机数。输出一个长度为5的列表，每个元素都是一个随机数

```
import random

random_list = [random.random() for _ in range(5)]  # _ 占位符
print(random_list)
```

\17. 输出一个5-100的随机数，要求为整数

```
import random
print(random.randint(5, 100))  # 包含5和100
```

\18. 输出一个长度为10的随机数列表，按照从大到小的顺序对其排序

```
import random

random_list = [random.randint(0,100) for _ in range(10)]
sorted_list = sorted(random_list,reverse=True)  #加reverse排序
print(sorted_list)
```

\19. 输出一个长度为10的随机数列表，要求每个数都是7的倍数

```
import random
rand_list = [random.randint(1, 10) * 7 for _ in range(10)]
#1-10的范围乘7，输出10个
print(rand_list)
```

\20. 输出100个，0-9的随机数，并统计每个数字出现的次数

```
import random
from collections import Counter   # counter是python的计数库
# 生成100个0-9的随机整数
numbers = [random.randint(0, 9) for _ in range(100)]
# 统计频率
counter = Counter(numbers)  #创建变量接收并且统计全部数据
for num in sorted(counter):  
    print(f"{num}: {counter[num]}次")
```



### 第六天

\1. python有哪些常用的第三方库

- **数据处理**：`NumPy`（数值计算）、`pandas`（数据分析）、`Matplotlib`（绘图）
- **网络请求**：`Requests`（HTTP 请求）
- **爬虫/解析**：`BeautifulSoup`（HTML/XML 解析）、`Scrapy`（爬虫框架）
- **AI/机器学习**：`TensorFlow`、`PyTorch`、`scikit-learn`
- **Web 开发**：`Django`、`Flask`（Web 框架）
- **数据库**：`SQLAlchemy`（ORM）、`pymysql`（MySQL 连接）
- **文件处理**：`openpyxl`（Excel）、`Pillow`（图像处理）

\2. 如何安装第三方库，并安装Requests库

```
pip install 库名         #不能直接下载可以问ai用阿里云链接
```

\3. 什么是http请求，get和post有什么区别

- **HTTP 请求**：客户端（浏览器/程序）向服务器发送数据并获取响应的协议。

- **GET vs POST**：

  | **特点**     | GET                       | POST                   |
  | :----------- | :------------------------ | :--------------------- |
  | **数据位置** | URL 参数（明文）          | 请求体（隐藏）         |
  | **安全性**   | 较低（数据暴露在 URL 中） | 较高                   |
  | **数据大小** | 有限（受 URL 长度限制）   | 支持大文件（如上传）   |
  | **用途**     | 获取数据（搜索、翻页）    | 提交数据（登录、表单） |

\4. 什么是API接口与直接访问页面有什么区别

- **API 接口**：服务器提供的**结构化数据通道**（如返回 JSON/XML），供程序调用。

- **与访问页面的区别**：

  | **对比项**   | API 接口                   | 直接访问页面             |
  | :----------- | :------------------------- | :----------------------- |
  | **返回内容** | 结构化数据（JSON/XML）     | HTML（渲染后用户可见）   |
  | **使用者**   | 程序（如 Python 脚本）     | 浏览器                   |
  | **目的**     | 数据交互（如获取天气信息） | 页面展示（用户直接阅读） |

\5. 如何使用Requests访问百度首页

```
import requests

response = requests.get("https://www.baidu.com")
print(response.status_code)  # 状态码（200 表示成功）
print(response.text[:200])   # 打印前200字符（HTML内容）
```

\6. 什么是json，与字典有什么区别

- **JSON**：轻量级**数据交换格式**（字符串），跨语言通用。

  ```
  {"name": "Alice", "age": 25}
  ```

- **Python 字典**：内存中的**数据结构**（键值对）。

  ```
  {"name": "Alice", "age": 25}  # Python 对象
  ```

- **区别**：

  | **JSON**             | **Python 字典**        |
  | :------------------- | :--------------------- |
  | 字符串格式（需解析） | 内存对象（可直接操作） |
  | 键必须用双引号 `""`  | 键可用单/双引号        |
  | 不支持注释           | 支持注释               |

\7. 什么情况下使用json

- **数据传输**：API 接口返回数据（如天气 API）。
- **配置文件**：如 `config.json`。
- **存储数据**：NoSQL 数据库（如 MongoDB）。
- **跨语言交互**：Python 和 JavaScript 通信。

\8. 在json之前是使用什么格式来进行数据交互

- **XML**（可扩展标记语言）：

  ```xml
  <user>
    <name>Alice</name>
    <age>25</age>
  </user>
  ```

- **缺点**：标签冗余、解析复杂、文件体积大。

\9. 什么是时间戳

- **定义**：从 **1970年1月1日 00:00:00 UTC** 开始计算的秒数（或毫秒）。
- **示例**：`1719196800` 表示 2024-06-24 12:00:00 UTC。

\10. 如何使用Python输出当前的时间戳

```python
import time

# 秒级时间戳
timestamp = int(time.time())
print(timestamp)  # 输出：1719196800（示例值）

# 毫秒级时间戳
timestamp_ms = int(time.time() * 1000)
print(timestamp_ms)
```

\11. 如何输出当前的时间

```python
from datetime import datetime

now = datetime.now()
print(now) 
```

\12. 如何对时间进行格式化，比如只输出“年-月-日 时:分”

```python
from datetime import datetime

now = datetime.now()
formatted = now.strftime("%Y-%m-%d %H:%M")
print(formatted)  
```

\13. 使用Python获取2小时前的时间，2小时后的时间，3天前的日期和4天后的日期

```python
from datetime import datetime, timedelta

now = datetime.now()
# 2小时前
two_hours_ago = now - timedelta(hours=2)
# 2小时后
two_hours_later = now + timedelta(hours=2)
# 3天前
three_days_ago = now - timedelta(days=3)
# 4天后
four_days_later = now + timedelta(days=4)

print(two_hours_ago.strftime("%Y-%m-%d %H:%M"))
print(two_hours_later.strftime("%Y-%m-%d %H:%M"))
print(three_days_ago.strftime("%Y-%m-%d %H:%M"))
print(four_days_later.strftime("%Y-%m-%d %H:%M"))
```

\14. 什么是时区，我国是哪个时区

- **时区**：地球划分的**时间区域**（每 15° 经度差 1 小时）。
- **中国时区**：`UTC+8`（东八区，北京时间）。

\15. 时区对时间戳有影响吗

**没有影响**！
时间戳是 **UTC 基准的绝对秒数**，全球统一。
时区只影响**本地时间的显示**（如 `1719196800` 在 UTC+8 显示为 08:00，在 UTC+0 显示为 00:00）

\16. 时间戳如何转换为对应时区的时间，要如何表示不同时区的时间

```python
current_timestamp = int(time.time())
print(current_timestamp)
# 使用当前时间戳（例如：2025年6月24日 21:37:00）
timestamp = current_timestamp  # 替换为你想表示的实际时间戳

# 转换为 UTC+8 时间（上海）
utc8_time = datetime.fromtimestamp(timestamp, pytz.timezone("Asia/Shanghai"))
print("UTC+8 时间:", utc8_time)

# 转换为 纽约时间（UTC-4，注意夏令时影响）
ny_time = datetime.fromtimestamp(timestamp, pytz.timezone("America/New_York"))
print("纽约时间:", ny_time)
```

\17. Linux系统中如何运行Python脚本

```
# 方法1：直接执行（需脚本有可执行权限）
chmod +x script.py
./script.py

# 方法2：用 python 解释器
python3 script.py
```

\18. Python脚本中如何调用系统命令，比如在Linux下调用pwd、ls等命令

```
import os
import subprocess

# 方法1：os.system（简单调用）
os.system("ls -l")

# 方法2：subprocess（推荐，可获取输出）
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)  # 打印命令输出
```

\19. 如何使用Python遍历某个目录下（包括子目录）都有哪些文件

```python
import os

for root, dirs, files in os.walk("/etc"):
    for file in files:
        file_path = os.path.join(root, file)
        print(file_path)
```

\20. Windows下的路径与Linux下的路径有什么区别，什么是斜线，什么是反斜线

- **Windows 路径**：
  使用反斜线 `\`（需转义为 `\\` 或使用原始字符串 `r"C:\Users"`）。
  示例：`C:\Users\Alice\file.txt`

- **Linux 路径**：
  使用斜线 `/`。
  示例：`/home/alice/file.txt`

- **跨平台建议**：
  使用 `os.path.join()` 自动处理：

  ```python
  import os
  path = os.path.join("folder", "subfolder", "file.txt")  # 自动适配系统
  ```



### 第七天

1. 什么是异常，如何捕获处理异常，比如捕获“1除以0”的异常    

   ```python
   try:
       result = 1 / 0  # 触发ZeroDivisionError
   except ZeroDivisionError as e:
       print(f"捕获异常: {e}")
   ```

2. 如何自定义异常，自己主动抛出异常并捕获，比如定义一个列表，随机添加几个数字元素，当元素的总值高于某个值时，抛出异常。

   ```
   class TotalExceededError(Exception):
       """当列表总和超过阈值时抛出"""
       pass
   import random
   my_list = []
   threshold = 50
   try:
       for _ in range(5):
           num = random.randint(1, 20)
           my_list.append(num)
           if sum(my_list) > threshold:
               raise TotalExceededError(f"总和超过{threshold} (当前: {sum(my_list)})")
   except TotalExceededError as e:
       print(f"捕获自定义异常: {e}")
       # 处理逻辑，如清除列表
       my_list.clear()
   ```
   
3. 将一个字典保存为json文件

   ```
   import json
   data = {"name": "Alice", "age": 30, "hobbies": ["reading", "hiking"]}
   with open("data.json", "w") as f:
       json.dump(data, f, indent=4)  # indent美化格式
   ```

4. 读取一个json文件为字典格式

   ```python
   import json
   with open("data.json", "r") as f:
       loaded_data = json.load(f)
   print(type(loaded_data))  
   ```

5. 如何创建一个csv文件

   ```python
   import csv
   headers = ["Name", "Age", "City"]
   rows = [
       ["Alice", 30, "New York"],
       ["Bob", 25, "London"],
       ["Charlie", 35, "Paris"]
   ]
   with open("data.csv", "w", newline="") as f:
       writer = csv.writer(f)
       writer.writerow(headers)
       writer.writerows(rows)
   ```
   
6. 什么是序列化和反序列化

   - **序列化**：将对象转换为可存储/传输的格式（如JSON、二进制）
   - **反序列化**：将存储格式转换回原始对象

7. Python如何将一个对象序列化为一个文件。如何读取此文件并反序列化为对象。

   ```python
   import pickle
   
   class User:
       def __init__(self, name, level):
           self.name = name
           self.level = level
   
   # 序列化到文件
   user = User("Alice", 5)
   with open("user.pkl", "wb") as f:
       pickle.dump(user, f)
   
   # 从文件反序列化
   with open("user.pkl", "rb") as f:
       loaded_user = pickle.load(f)
   print(loaded_user.name)  # Alice
   ```

   

8. xml格式是什么，python如何读取解析xml文件
  ```xml
  from xml.etree import ElementTree as ET
  
  xml_data = '''<?xml version='1.0' encoding='utf-8'?>
  <library>
  <book>
  <title>Python编程入门</title>
  <author>张三</author>
  <year>2020</year>
  </book>
  <book>
  <title>深入学习Python</title>
  <author>李四</author>
  <author>王五</author>
  <year>2021</year>
  </book>
  </library>'''
  
  root = ET.fromstring(xml_data)
  for book in root.findall('book'):
      title = book.find('title').text
      authors = [a.text for a in book.findall('author')]
      year = book.find('year').text
      print(f"书名: {title}, 作者: {authors}, 年份: {year}")
  ```

  

  9.读取上面的xml，转换为json格式，并保存为文件book.json

  ```python
  import json
  from xml.etree import ElementTree as ET
  xml_data = '''<?xml version='1.0' encoding='utf-8'?>
  <library>
  <book>
  <title>Python编程入门</title>
  <author>张三</author>
  <year>2020</year>
  </book>
  <book>
  <title>深入学习Python</title>
  <author>李四</author>
  <author>王五</author>
  <year>2021</year>
  </book>
  </library>'''
  def parse_books(xml_str):
      root = ET.fromstring(xml_str)
      books = []
      for book in root.findall('book'):
          book_data = {
              "title": book.find('title').text,
              "author": [a.text for a in book.findall('author')],
              "year": int(book.find('year').text)
          }
          # 单作者转为字符串
          if len(book_data["author"]) == 1:
              book_data["author"] = book_data["author"][0]
          books.append(book_data)
      return {"library": {"book": books}}
  
  json_data = parse_books(xml_data)
  with open("book.json", "w", encoding="utf-8") as f:
      json.dump(json_data, f, ensure_ascii=False, indent=2)
  ```

  

10.读取book.json文件，转为xml格式，并保存为文件book.xml

```python
import json
from xml.etree import ElementTree as ET
xml_data = '''<?xml version='1.0' encoding='utf-8'?>
<library>
<book>
<title>Python编程入门</title>
<author>张三</author>
<year>2020</year>
</book>
<book>
<title>深入学习Python</title>
<author>李四</author>
<author>王五</author>
<year>2021</year>
</book>
</library>'''
def json_to_xml(json_data):
    library = ET.Element("library")
    for book in json_data["library"]["book"]:
        book_elem = ET.SubElement(library, "book")
        ET.SubElement(book_elem, "title").text = book["title"]

        # 处理作者（字符串或列表）
        authors = book["author"]
        if isinstance(authors, str):
            ET.SubElement(book_elem, "author").text = authors
        else:
            for author in authors:
                ET.SubElement(book_elem, "author").text = author

        ET.SubElement(book_elem, "year").text = str(book["year"])

    # 添加XML声明
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(library, encoding="unicode")


with open("book.json", "r", encoding="utf-8") as f:
    json_data = json.load(f)

xml_output = json_to_xml(json_data)
with open("book.xml", "w", encoding="utf-8") as f:
    f.write(xml_output)
```



### 第八天

\1. Python有哪些库可以操作Mysql

Python 中常用的用于操作 MySQL 的库有：

| 库名                     | 简介                                    |
| ------------------------ | --------------------------------------- |
| `mysql-connector-python` | 官方 MySQL 提供的驱动器，无需第三方依赖 |
| `pymysql`                | 纯 Python 实现的 MySQL 客户端，轻量易用 |
| `SQLAlchemy`             | ORM 工具，支持多种数据库，包括 MySQL    |
| `peewee`                 | 轻量级 ORM，适合小型项目                |
| `PyMySQLPool`            | 支持连接池的 PyMySQL 封装（非标准）     |

\2. 安装一个Mysql，创建一个库pydb，作为本次练习使用的库

rocky linux 9  安装mysql

yum install -y mysql   mysql-server     mysql是客户端  mysql server是服务端

```mysql
CREATE DATABASE pydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pydb;
```

\3. 安装Faker库，并说明此库是干啥用的，什么场景下使用

安装python

```
yum install -y python3 python3-pip
pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple/  #设置pip加速地址为阿里云
pip install faker
```

**Faker** 是一个用于生成伪造数据的 Python 库，常用于：

- 测试环境填充假数据
- 开发时模拟用户数据
- 构造测试用例或演示数据
- 隐私保护中替代真实数据

例如可生成姓名、地址、电话号码、邮箱、日期等信息。

\4. 使用for循环调用Faker库，生成10条不重复的中文数据，每条数据中，包含姓名、性别、生日、地址、邮箱、手机号。

现在使用rocky linux 9 下的python 和数据库

```python
from faker import Faker

fake = Faker('zh_CN')  # 设置为中文环境

data = []
for _ in range(10):
    person = {
        "name": fake.name(),
        "gender": fake.random_element(elements=('男', '女')),
        "birthday": fake.date_between(start_date='-30y', end_date='today'),
        "address": fake.address(),
        "email": fake.email(),
        "phone": fake.phone_number()
    }
    data.append(person)

# 打印结果
for d in data:
    print(d)
```

\5. 创建一个数据表，id为主键自增、其他内容有姓名、性别、生日、地址、邮箱、手机号

```python
USE pydb;
CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    gender CHAR(2),
    birthday DATE,
    address TEXT,
    email VARCHAR(100),
    phone VARCHAR(20)
);
```

\6. 使用python中的faker生成随机数据，在上面创建的表中插入10000条数据。

```python
import pymysql               
from faker import Faker

fake = Faker('zh_CN')

# 连接数据库
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='admin123.',  # 替换为你自己的密码
    database='pydb',
    charset='utf8mb4'
)
cursor = conn.cursor()

# 插入数据
insert_sql = """
INSERT INTO people (name, gender, birthday, address, email, phone)
VALUES (%s, %s, %s, %s, %s, %s)
"""

for _ in range(10000):
    cursor.execute(insert_sql, (
        fake.name(),
        fake.random_element(elements=('男', '女')),
        fake.date_between(start_date='-80y', end_date='-18y'),
        fake.address(),
        fake.email(),
        fake.phone_number()
    ))

conn.commit()
cursor.close()
conn.close()
print("成功插入 10000 条数据")
```

\7. 使用python读取数据库中的这些人的信息，并计算这10000人的平均年龄以及最年龄最大的比最小的大几岁。

```python
[root@rocky1 python]# python3 batian7.py 
平均年龄：48.69 岁
年龄最大的比最小的大 62 岁

[root@rocky1 python]# cat batian7.py 
from datetime import datetime, date
import pymysql

def calculate_age(birthdate: date) -> int:
    return datetime.now().year - birthdate.year

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='admin123.',
    database='pydb',
    charset='utf8mb4'
)
cursor = conn.cursor()
cursor.execute("SELECT birthday FROM people")
results = cursor.fetchall()

ages = [calculate_age(row[0]) for row in results]

avg_age = sum(ages) / len(ages)
max_min_diff = max(ages) - min(ages)

print(f"平均年龄：{avg_age:.2f} 岁")
print(f"年龄最大的比最小的大 {max_min_diff} 岁")

cursor.close()
conn.close()
```

\8. 使用python统计这10000人中姓氏最多的前5位的具体数量（可以不考虑复姓）

```python
[root@rocky1 python]# python3 batian8.py 
姓氏前五名：
李: 711
张: 678
王: 652
刘: 530
陈: 477
[root@rocky1 python]# cat batian8.py 
from collections import Counter
import pymysql

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='admin123.',
    database='pydb',
    charset='utf8mb4'
)
cursor = conn.cursor()
cursor.execute("SELECT name FROM people")
results = cursor.fetchall()

first_names = [row[0][0] for row in results if row[0]]  # 取第一个字符作为姓
counter = Counter(first_names)

top_5 = counter.most_common(5)
print("姓氏前五名：")
for name, count in top_5:
    print(f"{name}: {count}")
```

\9. 统计这10000人的属相，只统计数量，以json格式体现，比如
{
"鼠":1224,
...
"猪":968
}

```python
[root@rocky1 python]# python3 batian9.py 
{
  "鸡": 893,
  "蛇": 820,
  "虎": 806,
  "牛": 792,
  "马": 772,
  "狗": 1033,
  "猪": 890,
  "鼠": 781,
  "羊": 775,
  "兔": 805,
  "龙": 842,
  "猴": 791
}
[root@rocky1 python]# cat batian9.py 
import json
from datetime import datetime
import pymysql
from collections import Counter

zodiac_dict = {
    0: '鼠', 1: '牛', 2: '虎', 3: '兔', 4: '龙', 5: '蛇',
    6: '马', 7: '羊', 8: '猴', 9: '鸡', 10: '狗', 11: '猪'
}

def get_zodiac(year):
    return zodiac_dict[(year - 2020) % 12]

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='admin123.',
    database='pydb',
    charset='utf8mb4'
)
cursor = conn.cursor()
cursor.execute("SELECT birthday FROM people")
results = cursor.fetchall()

zodiac_counter = Counter()

for row in results:
    # 方法1：直接使用date对象的year属性（推荐）
    year = row[0].year
    
    # 或者方法2：如果需要先转为字符串再解析（不推荐）
    # birth_str = row[0].strftime('%Y-%m-%d')
    # year = datetime.strptime(birth_str, '%Y-%m-%d').year
    
    animal = get_zodiac(year)
    zodiac_counter[animal] += 1

# 输出 JSON
print(json.dumps(zodiac_counter, ensure_ascii=False, indent=2))

# 关闭连接
cursor.close()
conn.close()

```


### 第九天

\1. 有哪些常用的网页状态码

1. 常用的网页状态码

| 状态码 | 名称                  | 描述           |
| :----- | :-------------------- | :------------- |
| 200    | OK                    | 请求成功       |
| 201    | Created               | 资源创建成功   |
| 301    | Moved Permanently     | 永久重定向     |
| 302    | Found                 | 临时重定向     |
| 400    | Bad Request           | 客户端请求错误 |
| 401    | Unauthorized          | 未授权         |
| 403    | Forbidden             | 禁止访问       |
| 404    | Not Found             | 资源不存在     |
| 500    | Internal Server Error | 服务器内部错误 |
| 502    | Bad Gateway           | 网关错误       |
| 503    | Service Unavailable   | 服务不可用     |

\2. 2xx、3xx、4xx、5xx的主要区别是什么

. 状态码分类区别

| 分类 | 含义       | 典型状态码 | 使用场景             |
| :--- | :--------- | :--------- | :------------------- |
| 2xx  | 成功       | 200, 201   | 请求被服务器成功处理 |
| 3xx  | 重定向     | 301, 302   | 需要客户端进一步操作 |
| 4xx  | 客户端错误 | 400, 404   | 客户端请求有问题     |
| 5xx  | 服务器错误 | 500, 503   | 服务器处理请求失败   |

\3. 使用request库调用https://httpbin.org/get接口

```python
[root@rocky1 jiutian]# python3 jiutian3.py 
状态码: 200
响应内容:
{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.32.4", 
    "X-Amzn-Trace-Id": "Root=1-685f9fd8-5abdc5285cda1ec349f51965"
  }, 
  "origin": "120.82.86.178", 
  "url": "https://httpbin.org/get"
}

[root@rocky1 jiutian]# cat jiutian3.py 
import requests

response = requests.get('https://httpbin.org/get')
print(f"状态码: {response.status_code}")
print(f"响应内容:\n{response.text}")

```

\4. 以get方式访问的接口是否可以直接使用浏览器访问

**可以**直接在浏览器中访问GET接口。
在浏览器地址栏输入：`https://httpbin.org/get` 即可查看响应结果。

\5. 使用request库调用https://httpbin.org/post接口，并提交表单
{'username': 'test', 'password': '123456'}

```python
[root@rocky1 jiutian]# python3 jiutian5.py 
状态码: 200
响应内容:
{'args': {}, 'data': '', 'files': {}, 'form': {'password': '123456', 'username': 'test'}, 'headers': {'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate', 'Content-Length': '29', 'Content-Type': 'application/x-www-form-urlencoded', 'Host': 'httpbin.org', 'User-Agent': 'python-requests/2.32.4', 'X-Amzn-Trace-Id': 'Root=1-685fa04f-2e0adc3067604c02109d44ca'}, 'json': None, 'origin': '120.82.86.200', 'url': 'https://httpbin.org/post'}
[root@rocky1 jiutian]# cat jiutian5.py 
import requests

data = {'username': 'test', 'password': '123456'}
response = requests.post('https://httpbin.org/post', data=data)

print(f"状态码: {response.status_code}")
print(f"响应内容:\n{response.json()}")

```

\6. 什么是表单

表单(Form)是HTML中用于收集用户输入数据的元素集合，包含：

- 输入字段（文本框、密码框、单选按钮等）
- 提交按钮
- 数据通过HTTP请求发送到服务器

\7. post提交数据时除了提交表单外还可以提交什么内容，最常用的是哪个

| 数据类型 | Content-Type             | 描述           | 使用场景     |
| :------- | :----------------------- | :------------- | :----------- |
| JSON     | application/json         | JSON格式数据   | API接口交互  |
| 文件     | multipart/form-data      | 文件上传       | 文件传输     |
| XML      | application/xml          | XML格式数据    | 传统系统集成 |
| 二进制   | application/octet-stream | 原始二进制数据 | 流媒体传输   |

**最常用的是JSON**，特别在RESTful API中。

\8. post可以同时提交表单和json吗

**不能**同时提交。HTTP请求只能有一个主体(body)，但可以：

1. 将JSON作为表单的一个字段值
2. 使用multipart/form-data混合不同类型数据

\9. 表单提交的内容跟json有什么区别呢，为什么不全部使用json

| 特性     | 表单               | JSON             |
| :------- | :----------------- | :--------------- |
| 编码     | URL编码或multipart | UTF-8字符串      |
| 数据结构 | 扁平键值对         | 支持复杂嵌套结构 |
| 数据类型 | 有限类型           | 完整数据类型支持 |
| 可读性   | 一般               | 良好             |
| 文件支持 | 原生支持           | 需要Base64编码   |

**不全部使用JSON的原因**：

1. 老系统兼容性问题
2. 文件上传效率低（需要Base64编码）
3. 简单场景过度设计
4. 浏览器表单默认行为支持

\10. 使用request库调用https://httpbin.org/post接口，提交一个json内容

```python
[root@rocky1 jiutian]# python3 jiutian10.py 
状态码: 200
响应内容:
{'args': {}, 'data': '{"name": "Alice", "age": 25, "hobbies": ["reading", "travel"]}', 'files': {}, 'form': {}, 'headers': {'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate', 'Content-Length': '62', 'Content-Type': 'application/json', 'Host': 'httpbin.org', 'User-Agent': 'python-requests/2.32.4', 'X-Amzn-Trace-Id': 'Root=1-685fa119-3064f7e959bc943b080d6f31'}, 'json': {'age': 25, 'hobbies': ['reading', 'travel'], 'name': 'Alice'}, 'origin': '120.82.86.224', 'url': 'https://httpbin.org/post'}
[root@rocky1 jiutian]# cat jiutian10.py 
import requests
import json

json_data = {'name': 'Alice', 'age': 25, 'hobbies': ['reading', 'travel']}
headers = {'Content-Type': 'application/json'}

response = requests.post(
    'https://httpbin.org/post',
    data=json.dumps(json_data),
    headers=headers
)

print(f"状态码: {response.status_code}")
print(f"响应内容:\n{response.json()}")
```

\11. 什么是request，什么是response

| 概念     | 描述                     | 组成部分               |
| :------- | :----------------------- | :--------------------- |
| Request  | 客户端向服务器发送的请求 | 请求行、请求头、请求体 |
| Response | 服务器对请求的响应       | 状态行、响应头、响应体 |

\12. 什么是请求头，有什么作用

请求头(Request Headers)是HTTP请求的元数据，主要作用：

1. **内容协商**：Accept, Accept-Language
2. **认证**：Authorization
3. **缓存控制**：Cache-Control
4. **客户端标识**：User-Agent
5. **Cookie管理**：Cookie
6. **内容类型声明**：Content-Type

\13. 什么是Cookie、什么是Session、什么是Token

| 概念    | 描述                 | 存储位置 |
| :------ | :------------------- | :------- |
| Cookie  | 客户端存储的小型数据 | 浏览器   |
| Session | 服务器存储的用户状态 | 服务器   |
| Token   | 无状态认证令牌       | 客户端   |

\14. 上述三者有什么不同，分别在什么场景下使用

| 特性     | Cookie       | Session     | Token          |
| :------- | :----------- | :---------- | :------------- |
| 存储位置 | 客户端       | 服务器      | 客户端         |
| 安全性   | 较低         | 较高        | 高             |
| 状态管理 | 有状态       | 有状态      | 无状态         |
| 扩展性   | 一般         | 差          | 好             |
| 跨域支持 | 有限制       | 有限制      | 支持           |
| 典型场景 | 用户偏好设置 | 传统Web应用 | 前后端分离应用 |

**使用场景**：

1. **Cookie**：记住登录状态、用户偏好设置
2. **Session**：传统Web应用（如电商购物车）
3. **Token**：
   - API认证（JWT）
   - 移动应用
   - 单点登录(SSO)
   - 前后端分离架构
