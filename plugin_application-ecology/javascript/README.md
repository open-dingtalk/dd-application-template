# 模板说明
- To开发者
    - 此模板是标准工作台生态组件（动态插件）开发专用
    - 此模板中的2个组件为示例组件，请提交版本之前删除以减少插件的包大小
- 模板目录示例
    ```
    ├── plugin
    │ ├── api
    | ├── components
    | | ├── chart
    | | | ├── config.json 
    | | | ├── pc.config.json
    | | | ├── index.acss
    | | | ├── index.axml
    | | | ├── index.js
    | | | ├── index.json
    │ │ ├── component-template
    | | | ├── config.json
    | | | ├── pc.config.json
    | | | ├── index.acss
    | | | ├── index.axml
    | | | ├── index.js
    | | | ├── index.json
    │ ├── index.js
    │ ├── package.json
    │ ├── plugin.json
    ```
- 目前PC工作台、移动端工作台的插件开发支持如下类别组件:
    - PC端工作台目前仅支持生态组件
        - pc注意事项:
            - 若需要开发PC工作台，则pc.config.json必需
            - 若仅开发移动端工作台插件，需要删掉pc.config.json
    - 移动端工作台支持定制和生态组件
## 开发约束

钉钉工作台插件中的组件开发遵守[钉钉小程序开发规范](https://developers.dingtalk.com/document/app/introduction-to-dingtalk-mini-programs)，同时需接受钉钉工作台插件的开发约束。包括：
* 不能使用钉钉小程序JSAPI，即dd.开头的所有方法
* 不能在组件中使用setInterval
* 不能在组件中使用webview
* 图片采用外链方式引入，不能在组件文件夹中包含图片，单张图片size在100k以内，像素比在2000*2000以内，不然可能导致黑屏
* 每个插件中组件数量不超过10个
* 每个插件包的大小1M以内
# 开发规范、SDK能力及流程
可以通过以下服务群的群文件中获取定制门户自定义组件开发文档。

在线文档：[定制工作台组件开发规范](https://developers.dingtalk.com/document/dashboard/koi8ku)
> 相关服务群：
> * 钉钉工作台&组件开发服务商共创群: 23108710
> * 标准工作台组件/解决方案接入群: 32548818
# 生态组件特别注意

请自检

- 是否实现了`darkmode`里的样式（参考示例当mode为dark时）
- 是否接入便捷设置`quickSetting`
   - 便捷设置包含以下四个设置：
   - `useStandardHead` 使用工作台组件标准标题栏，请所有组件升级到此设置
   - `useStandardContainer` 使用工作台组件标准样式，请所有组件升级到此设置
   - `containerType` 组件是标准高度的组件值设置为standard，2倍高度的组件值为doubleHeight
   - 配置参考示例如下：
        ````json    
        "quickSetting": {
            "useStandardHead": true,  
            "useStandardContainer": true, 
            "containerType": "standard" // standard or doubleHeight
        }
        ````
- 是否处理了`promotionState`为`STANDARD_WORKTAB`的营销态情况
    - 营销态点击时需打开`tryoutAddress`，不能打开应用内地址
    - 如果非营销态和营销态数据不一样，请在`didUpdate`里判断`promotionState`变更后刷新数据
- 如果需要每次返回工作台时刷新数据，请监听`onShow`事件（参考示例代码）
- `previewHeight`的占位高度请和实际高度一致（组件loading时会占位用）

