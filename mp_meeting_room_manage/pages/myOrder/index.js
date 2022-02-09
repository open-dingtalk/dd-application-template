import request from '../../util/request.js'

Page({
  data: {
    meetings: [],
    id: '', // 取消预约的room id
    modalOpened: false,
    buttons: [{text: '关闭', action: 'close'}, {text: '确认', action: 'delete', extClass: 'delete-button'}]
  },
  onLoad(query) {
    // 页面加载
    this.getData()
  },
  getData() {
    request({
      url: 'room/get_user_order_rooms',
      type: 'get',
    }).then(res => {
      this.setData({
        meetings: res.result.meetings
      })
    }).catch(err => {
      dd.alert({
        title: err,
        buttonText: '返回',
        success: () => {}
      })
    })
  },
  handleCancel(e) {
    const id = e.target.dataset.id
    this.setData({
      id,
      modalOpened: true
    })
  },
  onModalClose() {
    this.setData({
      modalOpened: false,
    })
  },
  onButtonClick(e) {
    const { action } = e.currentTarget.dataset.item
    if (action === 'close') {
      this.onModalClose()
    } else {
      this.cancelReserve()
    }
  },
  cancelReserve() {
    const {
      meetings,
      id
    } = this.data
    this.setData({
      meetings: meetings.filter(i => i.room.id !== id)
    })
    this.onModalClose()
    dd.device.notification.toast({
      text: '取消预定成功',
      duration: 2000,
      delay: 500
    })
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
