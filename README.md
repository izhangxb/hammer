# hammer

![981af50e464aa207c0bec5ce972f6195.jpg](https://i.loli.net/2020/04/21/9cKxMlatDQ4rAm1.jpg)

## 简介

基于electron的一个小工具软件，包含常用的一些开发工具，预计包含以下功能：

1. 编解码相关
    - Hash算法(MD5/SHA1...)
    - 对称加解密(AES/DES)
    - 非对称加解密(RSA)
    - unicode编解码
    - URL编解码
    
2. JSON 相关
    - JSON格式化
    - JS压缩
    - JSON转Java类
    - JSON转CSV
    
3. 时间相关
    - 获取当前时间戳
    - 时间戳转换

4. 二维码
    - 生成二维码

5. 其他
    - 驼峰转换
    - 大小写转换
    - RGB与HEX转换
    
## 项目启动

```javascript
npm install

npm run dev //启动渲染webpack

npm run electron_start //启动electron

npm run build //打包生产环境JS文件

npm run packager_mac //打包mac环境安装包

npm run packager_win32 //打包windows环境安装包

```

