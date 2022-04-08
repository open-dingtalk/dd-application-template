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

## 配置后台申请创建插件
https://open-dev.dingtalk.com/fe/pluginCenter#/
## ding cli 安装
sudo npm install -g dingtalk-design-cli@0.20.9-beta.10

## ding init
选择插件，根据需要选择套件模板类型
配置miniAppId、token  
ding.config.json->  { miniAppId , token }  
plugin.json-> { pluginId : miniAppId }  

## ding dev 用来热更新
然后运行 proxy 子命令，用来代理线上代码；  
打开OA审批设计态和运行态即可在线调试

## ding upload

配置后台查看上传结果
https://open-dev.dingtalk.com/fe/pluginCenter#/

