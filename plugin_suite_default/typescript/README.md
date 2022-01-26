## 套件3.0示例
支付宝小程序，开发自定义组件
https://opendocs.alipay.com/mini/framework/custom-component-overview

## 目录结构 
根目录指定 npm install   
src/plugin 下执行 npm install   
开发目录 src/plugin/components  
| 文件      | 说明 |
| ----------- | ----------- |
| config.json      | 配置文件       |
| runtime/pc/index.axml   | pc端入口        |
| runtime/mobile/index.axml | mobile端入口 |
| designer/setter/CustomSetter/index.axml | 自定义setter |

参考自定义组件 leaveReason 开发流程

## 配置后台申请创建插件(暂时忽略)
https://open-dev.dingtalk.com/fe/old#/plugin

## ding cli 安装
sudo npm install -g dingtalk-design-cli@0.20.3-beta.2

## ding init
配置miniAppId、token  
ding.config.json->  { miniAppId , token }  
plugin.json-> { pluginId : miniAppId }  

## ding dev 用来热更新
然后运行 proxy 子命令，用来代理线上代码；  
打开OA审批设计态和运行态即可在线调试

## ding upload

上传时移除根目录gulpfile.js中 223 行,移除setters、props校验
改动点如下

`setters: [],  
props: {}`

配置后台查看上传结果
https://open-dev.dingtalk.com/fe/old#/plugin

## 已知问题：
setter暂时不测试，因为工作台校验问题；
proxy，h5pro热更新有问题，每次改动都得重启cli，这个得再看下
