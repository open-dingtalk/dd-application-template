Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  toReserve() {
    dd.navigateTo({
      url: '/pages/meetingOrders/index'
    })
  },
  toMyReserve() {
    dd.navigateTo({
      url: '/pages/myOrder/index'
    })
  },
  toManage() {
    console.log('to manage')
    dd.navigateTo({
      url: '/pages/manage/index'
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
