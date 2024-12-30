## 项目启动
在高德地图当中申请自己的key
配置到src/components/Sence.vue当中
```shell
## 采用的为淘宝源https://registry.npm.taobao.org
npm i

npm start
```

## 背景介绍
本项目基于 https://github.com/fh332393900/threejs-demo.git 进行改造

原项目以threeJs为主导

本项目套用其结构，将threeJs更改为高德地图为背景的简单大屏模板
![image](https://github.com/summer-077/bin/base.gif)
![image](https://github.com/summer-077/bin/warning.gif)


## 项目介绍
技术栈：Vue3+TS+Pinia+高德地图

项目为纯前端展示，可直接运行学习，不需要苦恼于前后端联动配置

### 适用于
1.想要快速搭建一个简单的大屏项目并二次改造

2.想要学习vue3如何导入高德地图

3.高德地图中如何自定义点样式

4.高德地图如何自定义点浮窗

## 问题记录

1.marker点发生位移
https://www.cnblogs.com/istream/p/5940274.html

2.infoWindow动态更新
https://blog.csdn.net/weixin_33582089/article/details/142698673

3.高德地图icon只出现一半问题
跟amap-icon有关,元素审查一下就可以看到

4.无缝滚动
https://blog.csdn.net/weixin_44867717/article/details/121521253

## 最后
有疑问欢迎随时与作者交流~
