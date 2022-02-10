const app = getApp()

Page({
  data: {
    id: '',
    name: '',
    num: '',
    address: '',
    edit: false,
  },
  onLoad(query) {
    if (query.id) {
      const current = app.globalData.meetings.filter(i => String(i.id) === query.id)[0];
      this.setData({
        name: current.name,
        num: current.num,
        address: current.address,
        id: current.id,
        edit: true
      })
      dd.setNavigationBar({
        title: '编辑会议室',
      });
    }
  },
  onNameInput(e) {
    this.setData({
      name: e.detail.value,
    })
  },
  onNumInput(e) {
    this.setData({
      num: e.detail.value,
    })
  },
  onAddressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },
  handleConfirm() {
    const {
      id,
      num,
      name,
      address,
      edit
    } = this.data

    if (!num || !name || !address) {
      dd.alert({
        title: '请填写完整信息',
        buttonText: '返回',
        success: () => {}
      })
      return
    }

    if (edit) {
      app.globalData.meetings = app.globalData.meetings.filter(i => i.id !== id)
    }

    app.globalData.meetings.push({
      id: Date.now(),
      num,
      name,
      address
    })
    dd.navigateBack()
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '会议室预定',
      desc: '会议室预定钉钉小程序',
      path: 'pages/index/index',
    };
  },
});
