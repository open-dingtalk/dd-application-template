import request from '../../util/request.js'

const app = getApp()
Page({
  data: {
    meetings: [],
    modalOpened: false,
    buttons: [{text: '关闭', action: 'close'}, {text: '删除', action: 'delete', extClass: 'delete-button'}]
  },
  onLoad(query) {
    // 页面加载
    this.getData();
  },
  onShow() {
    this.setData({
      meetings: app.globalData.meetings
    })
  },
  
  handleEdit(e) {
    const { id } = e.target.dataset
    dd.navigateTo({
      url: `/pages/new/index?id=${id}`
    })
  },
  handleDelete(e) {
    const { id } = e.target.dataset
    this.setData({
      currentId: id,
    })
    this.openModal()
  },
  handleAdd() {
    dd.navigateTo({
      url: '/pages/new/index'
    })
  },
  openModal() {
    this.setData({
      modalOpened: true,
    });
  },
  onModalClick() {
    this.setData({
      modalOpened: false,
    });
  },
  onModalClose() {
    this.setData({
      modalOpened: false,
    });
  },
  onButtonClick(e) {
    const { action } = e.currentTarget.dataset.item
    if (action === 'close') {
      this.onModalClose()
    } else {
      this.deleteMeetingRoom()
    }
  },
  deleteMeetingRoom() {
    const oldMeetings = this.data.meetings
    const meetings = oldMeetings.filter(i => i.id !== this.data.currentId)
    this.setData({
      meetings
    })
    app.globalData.meetings = meetings
    this.onModalClose()
    request({
      url: 'room/delete_room',
      type: 'delete',
      params: {
        id: this.data.currentId,
      }
    }).then(res => {
      dd.showToast({
        type: 'success',
        content: '删除成功',
        duration: 2000,
      })
    }).catch(err => {
      dd.alert({
        title: err,
        buttonText: '返回',
        success: () => {}
      })
    })
  },
  getData() {
    const params = {
      a: 1
    }
    dd.showLoading({
      content: '正在加载……'
    })
    request({
      url: 'room/list_room',
      type: 'post',
      params,
    }).then(res => {
      dd.hideLoading()
      if (res.success) {
        this.setData({
          meetings: res.result.meetings
        })
        app.globalData.meetings = this.data.meetings
      }
    }).catch(err => {
      dd.alert({
        title: err,
        buttonText: '返回',
        success: () => {}
      })
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
