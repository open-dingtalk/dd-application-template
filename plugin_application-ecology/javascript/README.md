# 模板说明
此模板是标准工作台生态组件（动态插件）开发专用，需使用指定版本的小程序IDE进行开发，一般最新版本IDE已支持工作台插件，如无，可从"钉钉门户伙伴共创群"中获取IDE。
此模板中的4个组件为示例组件，请提交版本之前删除以减少插件的包大小

## 开发约束
钉钉工作台插件开发需使用指定版本的小程序IDE。

钉钉工作台插件中的组件开发遵守[钉钉小程序组件开发规范](https://ding-doc.dingtalk.com/doc#/dev/ed25rr)，同时需接受钉钉工作台插件的开发约束。包括：
* 不能使用钉钉小程序JSAPI，即dd.开头的所有方法
* 不能在组件中使用setInterval
* 不能在组件中使用webview
* 图片采用外链方式引入，不能在组件文件夹中包含图片，单张图片size在100k以内，像素比在2000*2000以内，不然可能导致黑屏
* 每个插件中组件数量不超过10个
* 每个插件包的大小1M以内

# 开发规范、SDK能力及流程
请在"钉钉门户伙伴共创群"的群文件中获取定制门户自定义组件开发文档。

在线文档：[定制工作台组件开发规范](https://developers.dingtalk.com/document/dashboard/koi8ku)

# 生态组件特别注意

请自检

- 是否实现了`darkmode`里的样式（参考示例当mode为dark时）
- 是否配置了`useComponentHeadInStandardWorktab`使用通用头部
- 是否配置了`useContainerStyleInStandardWorktab`使用通用卡片样式
- 是否处理了`promotionState`为`STANDARD_WORKTAB`的营销态情况
    - 营销态点击时需打开`tryoutAddress`，不能打开应用内地址
    - 如果非营销态和营销态数据不一样，请在`didUpdate`里判断`promotionState`变更后刷新数据
- 如果需要每次返回工作台时刷新数据，请监听`onShow`事件（参考示例代码）
- `previewHeight`的占位高度请和实际高度一致（组件loading时会占位用）

