>  seleium 学习记录



```
 #一套题目流程
 
#第一题
from selenium.webdriver.common.by import By
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('http://hmshop-test.itheima.net/Home/user/login.html')
driver.implicitly_wait(3)
driver.find_element(By.CLASS_NAME,'text_cmu').send_keys('13012345678')
driver.find_element(By.ID,'password').send_keys('123456')
driver.find_element(By.ID,'verify_code').send_keys('8888')
driver.find_elements(By.TAG_NAME,'a')[3].click()
driver.find_element(By.LINK_TEXT,'消息通知').click()
driver.find_elements(By.NAME,'msg_id')[0].click()
driver.get_screenshot_as_file(r'D:\test_accept01.png')


#第二题
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class denglu(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://hmshop-test.itheima.net/Home/user/login.html')
        self.driver.implicitly_wait(3)
        self.driver.maximize_window()
    def tearDown(self):
        self.driver.quit()
    def test_denglu01(self):
        driver = self.driver
        driver.implicitly_wait(3)
        driver.find_element(By.CLASS_NAME, 'text_cmu').send_keys('13012345678')
        driver.find_element(By.NAME, 'password').send_keys('123456')
        driver.find_element(By.ID, 'verify_code').send_keys('8888')
        driver.find_element(By.XPATH, '//*[@id="loginform"]/div/div[6]/a').click()
    def test_denglu02(self):
        driver=self.driver
        driver.implicitly_wait(3)
        driver.find_element(By.NAME,'username').send_keys('13012345678')
        driver.find_element(By.ID, 'password').send_keys('123456')
        driver.find_element(By.ID, 'verify_code').send_keys('8888')
        driver.find_elements(By.TAG_NAME, 'a')[3].click()
        driver.find_element(By.XPATH,'/html/body/div[1]/div/div/ul/li[1]/a').click()
        driver.get_screenshot_as_file(r'D:\test_accept02.png')

if __name__ == '__main__':
    unittest.main()


#第三题  需要其他数据csvv.csv

# csv
import csv
def read():
    path = (r'C:\Users\Z\Desktop\11\testdata.csv')
    steam=open(path,'r',encoding='UTF-8')
    data=csv.reader(steam)
    list=[]
    i=0
    for row in data:
        if i!=0:
            list.append(row)
        i=i+1
    return list

if __name__ == '__main__':
    data=read()
    for row in data:
        print(row)



import ddt
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from csvv import read
import time

@ddt.ddt
class denglu(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://hmshop-test.itheima.net/Home/user/login.html')
        time.sleep(5)
        self.driver.maximize_window()
    def tearDown(self):
        self.driver.quit()
    steam = read()
    @ddt.data(*steam)
    def test_denglu01(self,list):
        try:
            self.driver.implicitly_wait(3)
            self.driver.find_element(By.ID,'username').send_keys(list[0])
            self.driver.find_element(By.NAME,'password').send_keys(list[1])
            self.driver.find_element(By.ID,'verify_code').send_keys('8888')
            self.driver.find_element(By.CSS_SELECTOR,'.J-login-submit').click()
            self.driver.implicitly_wait(10)
            a = self.driver.find_element(By.CSS_SELECTOR,".layui-layer-content").text
            print(a)
            self.assertEqual(a,list[2])
            time.sleep(1)
        except Exception as z:
            print('异常报错' '\n')
            self.driver.get_screenshot_as_file(r'C:\Users\Z\Desktop\11\baocuo1.png')
        finally:
            print('这次程序运行结束' + '\n')

if __name__ == '__main__':
    unittest.main()

```

> 7.21 练习

```
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.action_chains import ActionChains

driver =webdriver.Chrome()
#提示框
# driver.get(r'C:\Users\Z\Desktop\11\alert.html')
# driver.implicitly_wait(3)
# driver.maximize_window()
# driver.find_element(By.ID,'alerta').click() #提示框
# driver.switch_to.alert.accept()
# time.sleep(2)
# driver.find_element(By.XPATH,'//*[@id="confirma"]').click() #确认框
# driver.switch_to.alert.dismiss()
# time.sleep(2)
# driver.find_element(By.XPATH,'//*[@id="prompta"]').click() #输入框
# time.sleep(1)
# driver.switch_to.alert.accept()
# time.sleep(2)
# a = driver.find_element(By.XPATH,'//*[@id="confirma"]') #不能打印文字
# print(a.text)

#下拉框
# driver.get(r'C:\Users\Z\Desktop\11\register.html')
# name = driver.find_element(By.NAME,'selecta')
# Select(name).select_by_index(3)
# time.sleep(2)
# Select(name).select_by_value('gz')
# time.sleep(1)
# Select(name).select_by_visible_text('北京')
# time.sleep(1)

# driver.get('http://www.jd.com')
# driver.maximize_window()
# a = driver.find_element(By.LINK_TEXT,'家用电器')
# ActionChains(driver).move_to_element(a).perform()
# a.click()
# time.sleep(2)
# driver.find_element(By.XPATH,'//*[@id="ttbar-login"]/a[1]').click()  #家用电器页面跳转登录界面没反应但是没报错
# time.sleep(2)


# driver.get('http://www.jd.com')
# driver.maximize_window()
# driver.maximize_window()
# handle1 = driver.current_window_handle
# print('输入当前句柄号：',handle1)
#
# driver.find_element(By.LINK_TEXT,'家用电器').click()
# handle2 = driver.current_window_handle
# print('输入所有句柄号:',handle2)
# time.sleep(2)
# driver.switch_to.window(driver.window_handles[0])
# time.sleep(3)


# driver.get('http://hmshop-test.itheima.net/Home/user/login.html')
# driver.maximize_window()
# driver.find_element(By.XPATH,'//*[@id="username"]').send_keys('13800000002')
# driver.find_element(By.XPATH,'//*[@id="password"]').send_keys('123456')
# driver.find_element(By.XPATH,'//*[@id="verify_code"]').send_keys('8888')
# driver.find_element(By.NAME,'sbtbutton').click()
# driver.implicitly_wait(5) #智能等待
# a = driver.find_element(By.XPATH,'/html/body/div[2]/div/div[3]/ul/li[2]/div/div[1]/span')
# ActionChains(driver).move_to_element(a).perform()
# driver.find_element(By.XPATH,'/html/body/div[2]/div/div[3]/ul/li[2]/div/div[2]/a[2]').click()
# driver.find_element(By.XPATH,'/html/body/div[3]/div/div[2]/div[2]/div/div[1]/a/span').click()
# driver.find_element(By.XPATH,'//*[@id="address_form"]/div[2]/div/div[2]/div[1]/div/input').send_keys('小中')
# driver.find_element(By.XPATH,'//*[@id="address_form"]/div[2]/div/div[2]/div[2]/div/input').send_keys('13800000088')
# a= driver.find_element(By.ID,'province')
# Select(a).select_by_visible_text('北京')
# b = driver.find_element(By.XPATH,'//*[@id="city"]')
# Select(b).select_by_value('72')
# c = driver.find_element(By.NAME,'district')
# Select(c).select_by_index(41)
# driver.find_element(By.XPATH,'//*[@id="address_form"]/div[2]/div/div[2]/div[4]/div/input').send_keys('北京朝阳区')
# driver.find_element(By.XPATH,'//*[@id="address_submit"]').click()
# time.sleep(2) #强制等待
# #添加成功

```

