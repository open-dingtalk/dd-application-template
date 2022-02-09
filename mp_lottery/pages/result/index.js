import request from '../../util/request.js';
import moment from 'moment';

Page({
  data: {
    records: [],
    lotteryCount: null,
    userCount: null,
    winnignCount: null,
    winningUserCount: null
  },
  changeTabKey(event) {
    this.setData({
      tabkey: event.target.dataset.key
    })
  },
  onLoad(query) {
    // 页面加载
    request({
      url: `api/user/getLotteryResult?lotteryId=${query.id}`,
      type: 'get',
    }).then(res => {
      for (let i = 0; i < res.data.records.length; i++) {
        res.data.records[i].time = moment(res.data.records[i].time).format('YYYY-MM-DD HH:mm')
      }
      this.setData({
        ...res.data
      })
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '抽奖',
      desc: '',
      path: 'pages/index/index',
      imageUrl: 'https://img.alicdn.com/imgextra/i2/O1CN01NqnRfz1mFhHzTK8Ih_!!6000000004925-2-tps-295-164.png',
    };
  },
});
