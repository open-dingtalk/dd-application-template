import request from '../../util/request.js'

Page({
  data: {
    meetings: [],
  },
  onLoad(query) {
    // 页面加载
    this.getData();
  },
  getData() {
    request({
      url: 'room/list_full_room',
    }).then(res => {
      this.setData({
        meetings: res.result.meetings
      })
    })
  },
  goOrder() {
    dd.navigateTo({
      url: '/pages/meetingOrder/index'
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
