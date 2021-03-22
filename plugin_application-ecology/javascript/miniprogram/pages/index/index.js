import { componentsData } from "../../mock/componentsData";

Page({
  data: {
    sdkReady: false,
    componentsData: componentsData,
    locale: 'zh_CN',
    // light dark ，mock时两种可选
    mode: 'light',
    config: {
      corpId: ""
    }
  },
  onLoad(query) {
    if (!dd.canIUse("plugin.dynamic")) {
      dd.alert({
        title: "温馨提示",
        content:
          '此工程示例依赖动态插件功能。请在app.json文件中添加"useDynamicPlugins":true配置声明。'
      });
      return;
    }

    this.setData({
      config: {
        corpId: query.corpId
      }
    });

    // 加载SDK包，如果SDK升级，需要修改@后的版本号
    dd.loadPlugin({
      plugin: "5000000000100449@0.0.2",
      success: () => {
        this.worktab = requirePlugin("dynamic-plugin://5000000000100449");
        const plugin = requirePlugin("myPlugin");

        plugin.registerWorktab(this.worktab);

        this.setData({ sdkReady: true });
      },
      fail: e => {
        console.error("load sdk fail", e);
      }
    });
  },
  onReady() {
    // 页面加载完成
  },

  onShow() {
    // 页面显示
    if (
      this.worktab &&
      this.worktab.sdk &&
      this.worktab.sdk.triggerCustomEvent
    ) {
      this.worktab.sdk.triggerCustomEvent("onShow");
    }
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  }
});
