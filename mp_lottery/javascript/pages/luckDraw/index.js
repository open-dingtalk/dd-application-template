import request from '../../util/request.js'
Page({
  data: {
    id: '',
    title: "这是一个抽奖标题",
    lotteryInfo: null,
    prizes: [],
    winPrizes: [],
    leftDrawCount: 0
  },
  changeTabKey(event) {
    this.setData({
      tabkey: event.target.dataset.key
    })
  },
  toIndex() {
    dd.navigateTo({
      url: '/pages/index/index'
    })
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
    dd.hideShareMenu();
    request({
      url: 'api/user/lottery?lotteryId=' + (option.query.id || query.id),
      type: 'get',
      
    }).then(res => {
      if (res.status != -1) {
        this.setData({
          lotteryInfo: res.data.lotteryInfo.lottery[0],
          prizes: res.data.lotteryInfo.prizes,
          leftDrawCount: res.data.record ? res.data.record.leftTime : res.data.lotteryInfo.lottery[0].lot_times
        })
      }
    })
  },
  // 开始抽奖
  onDraw(event) {
    dd.showLoading({
      content: '正在抽奖……'
    })
    request({
      url: 'api/user/draw',
      type: 'post',
      params: {
        "lotteryId": this.data.id
      }
    }).then(res => {
      dd.hideLoading()
      if (res.status === 200) {
        this.setData({
          winPrizes: res.data.prizes,
          leftDrawCount: res.data.leftDrawCount
        })
        dd.confirm({
          title: `恭喜您！已中奖！`,
          content: `奖品：${res.data.prizes[res.data.prizes.length - 1].title}`,
          confirmButtonText: '查看',
          cancelButtonText: '确认',
          success: (res) => {
            if (res.confirm) {
              dd.navigateTo({
                url: `/pages/index/index?tab=0`
              })
            }
          }
        })
      } else if (res.message){
        dd.alert({
          title: res.message,
          buttonText: '返回',
          success: () => {}
        })
        if (res.data && res.data.leftDrawCount) {
          this.setData({
            leftDrawCount: res.data.leftDrawCount
          })
        } else {
          this.setData({
            leftDrawCount: 0
          })
        }
      }
    })

  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '抽奖',
      desc: '',
      path: `pages/luckDraw/index?id=${this.data.id}`,
      imageUrl: 'https://img.alicdn.com/imgextra/i2/O1CN01NqnRfz1mFhHzTK8Ih_!!6000000004925-2-tps-295-164.png',
      success: function (res) {
        console.log('------------- luck', res)
      },
      fail: function (fail) {
        console.log('------------- luck fail', fail)
      },
    }
  },
})
