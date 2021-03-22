App({
  onLaunch(options) {
    console.log('App onLaunch', options);
    this.options = options;

    if (typeof dd === 'undefined') {
      dd.alert({
        title: '温馨提示',
        content: '此工程示例仅支持钉钉工作台插件场景，请切换到正确的应用类型',
      });
    }
  },
});
