import request from '../../util/request'
import moment from 'moment'
Page({
  data: {
    id: '',
    title: "这是一个抽奖标题",
    canIUseShareButton: true,
    selectData: ['否（不限制单用户中奖次数）', '是（每用户只能中奖一次）'],
  },
  onLoad(query) {
    let option = dd.getLaunchOptionsSync()
    if (option.query.id) {
      this.setData({
        id: option.query.id
      })
    } else {
      this.setData({
        id: query.id
      })
    }
    
    dd.setNavigationBar('抽奖详情')
    this.onInvite()
    request({
      url: `api/lottery?lotteryId=${query.id}`,
      type: 'get',
    }).then(res => {
      console.log('res', res);
      if (res.status !== 200) return dd.showToast({
        type: 'fail',
        content: res.message,
        delay: 5000
      })
      let lottery = res.data.lottery[0]
      lottery.end_time = moment(lottery.end_time).format('YYYY-MM-DD HH:mm')
      lottery.start_time = moment(lottery.start_time).format('YYYY-MM-DD HH:mm')
      this.setData({
        lottery: lottery,
        prizes: res.data.prizes
      })
    })
  },
  // 跳转至编辑页面
  toForm(event) {
    dd.navigateTo({
      url: '/pages/form/index?id=' + event.target.dataset.id
    })
  },
  // 跳转至结果页面
  toResult(event) {
    dd.navigateTo({
      url: '/pages/result/index?id=' + event.target.dataset.id
    })
  },
  onShareAppMessage() { 
    return {
      title: '抽奖',
      desc: '', 
      path: `pages/luckDraw/index?id=${this.data.id}`,
      imageUrl: 'https://img.alicdn.com/imgextra/i2/O1CN01NqnRfz1mFhHzTK8Ih_!!6000000004925-2-tps-295-164.png',
      success: function (res) {
        console.log('-------------', res)
      },
      fail: function (fail) {
        console.log('------------- fail', fail)
      },
    }
  },
  onShow() {
    // 页面显示
    request({
      url: `api/lottery?lotteryId=${this.data.id}`,
      type: 'get',
    }).then(res => {
      if (res.status !== 200) return dd.showToast({
        type: 'fail',
        content: res.message,
        delay: 5000
      })
      let lottery = res.data.lottery[0]
      lottery.end_time = moment(lottery.end_time).format('YYYY-MM-DD HH:mm')
      lottery.start_time = moment(lottery.start_time).format('YYYY-MM-DD HH:mm')
      
      // mock数据调整
      if (lottery.end_time < lottery.start_time) {
        [lottery.end_time, lottery.start_time] = [lottery.start_time, lottery.end_time]
      }

      this.setData({
        lottery: lottery,
        prizes: res.data.prizes
      })
    })
  },
  // 邀请抽奖用户
  onInvite() {
    this.setData({ canIUseShareButton: dd.canIUse('button.open-type.share') }) 
  },
})
