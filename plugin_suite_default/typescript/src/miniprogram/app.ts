interface Extra {
  options: AppX.AppLaunchOption
}

App<Extra>({
  options: {
    path: '',
  },
  onLaunch(options) {
    console.log('App onLaunch', options);
    this.options = options;

    if (typeof dd === 'undefined') {
      my.alert({
        title: '温馨提示',
        content: '此工程示例仅支持钉钉OA审批套件场景，请切换到正确的应用类型',
      });
    }
  },
});
