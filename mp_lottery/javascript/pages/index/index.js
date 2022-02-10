import request from '../../util/request.js'

Page({
  data: {
    tab: ['我参与的抽奖', '我发起的抽奖'],
    tabkey: 0,
    list: []
  },
  onShow(query) {
    // 页面显示
    this.getData()
  },
  // 切换tab
  changeTabKey(event) {
    this.setData({
      tabkey: event.target.dataset.key
    }, (res) => {
      this.getData()
    })
  },
  // 获取列表数据
  getData() {
    this.setData({
      list: []
    })
    request({
      url: !this.data.tabkey ? 'api/user/joinLottery' : 'api/user/ownLottery',
      type: 'get',
    }).then(res => {
      this.setData({
        list: [...res.data.list] || []
      })
    })
  },
  // 跳转至新增页面
  toForm(event) {
    dd.navigateTo({
      url: event.target.dataset.id ? '/pages/form/index?id=' + event.target.dataset.id : '/pages/form/index'
    })
  },
  // 跳转至详情页面
  toDetail(event) {
    // 如果是我参与的抽奖，退出
    if (!this.data.tabkey) return
    console.log('333')
    dd.navigateTo({
      url: '/pages/detail/index?id=' + event.target.dataset.id
    })
  },
})
