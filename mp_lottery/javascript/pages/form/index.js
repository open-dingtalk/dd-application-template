import request from '../../util/request.js'
import moment from 'moment'

Page({
  data: {
    id: '',
    lotteryInfo: {
      title: '',
      startTime: '',
      endTime: '',
      ruleDesc: '',
      lotTimes: '',
      winningOnce: 1,
    },
    prizes: [
      {
        title: "",
        totalCount: '',
        leftCount: '',
        probability: '',
        noDisabled: true
      }
    ],
    selectData: ['否（不限制单用户中奖次数）', '是（每用户只能中奖一次）'],
  },
  // 添加一项
  addItem() {
    let prizesData = {
      title: "",
      totalCount: '',
      leftCount: '',
      probability: '',
      noDisabled: true
    } 
    this.data.prizes.push({...prizesData})
    this.setData({prizes: [...this.data.prizes]})
  },
  // 选择是否移除
  selectIsRemove (e) {
    dd.showActionSheet({
      title: '中奖后移出',
      items: this.data.selectData,
      cancelButtonText: '取消',
      success: (res) => {
        e.detail.value = res.index
        this.changeLotteryInfo(e)
      },
    });
  },
  // 选择日期
  datePicker(e) {
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      currentDate: moment().format('YYYY-MM-DD HH:mm'),
      startDate: moment().subtract(1, 'Y'),
      endDate: moment().add(1, 'Y'),
      success: (res) => {
        e.detail.value = res.date
        this.changeLotteryInfo(e)
      },
    })
  },
  // 修改抽奖信息
  changeLotteryInfo(e) {
    if (e.target.dataset.type === "lotTimes" ) {
      e.detail.value = Math.floor(e.detail.value)
      if (e.detail.value === this.data.lotteryInfo.lotTimes) return
    }
    if (e.target.dataset.type === "winningOnce" ) {
      if (e.detail.value !== 0 && e.detail.value !== 1)
      return
    }
    this.setData({
      lotteryInfo: {
        ...this.data.lotteryInfo,
        [e.target.dataset.type]: e.detail.value
      }
    })
  },
  // 修改奖品配置
  changePrizes(e) {
    if (e.target.dataset.type === 'totalCount' ){
      this.data.prizes[e.target.dataset.index][e.target.dataset.type] = +e.detail.value
    } else {
      this.data.prizes[e.target.dataset.index][e.target.dataset.type] = e.detail.value
    }
    
    this.setData({
      prizes: this.data.prizes
    })
  },
  // 判断必填
  isMost() {
    let msg = []
    let lotteryInfoMost = [{
        key: 'title',
        msg: '抽奖标题'
      },
      {
        key: 'startTime',
        msg: '开始时间'
      },
      {
        key: 'endTime',
        msg: '结束时间'
      },
      {
        key: 'lotTimes',
        msg: '每人抽奖次数'
      },
      {
        key: 'winningOnce',
        msg: '中奖后移出'
      }]
    for(let i = 0; i < lotteryInfoMost.length; i++) {
      if (lotteryInfoMost[i].key === 'winningOnce') {
        if (this.data.lotteryInfo[lotteryInfoMost[i].key] === '') {
          msg.push(lotteryInfoMost[i].msg)
        }
      } else if (!this.data.lotteryInfo[lotteryInfoMost[i].key]) {
        msg.push(lotteryInfoMost[i].msg)
      }
    }
    for (let i = 0; i < this.data.prizes.length; i++) {
      if (!this.data.prizes[i].title) {
        if (msg.indexOf('奖品名称') === -1) msg.push('奖品名称')
      }
      if (!this.data.prizes[i].totalCount) {
        if (msg.indexOf('奖品数量') === -1) msg.push('奖品数量')
      }
      if (!this.data.prizes[i].probability || Number(this.data.prizes[i].probability) <= 0) {
        if (msg.indexOf('中奖率') === -1) msg.push('中奖率')
      }
    }
    if (msg.length) {
      dd.alert({
        title: '请将表单填写完整',
        content: `请填写${msg.join('、')}`,
        buttonText: '好的'
      });
      return false
    } else {
      return true
    };
  },
  // 创建抽奖
  onSave(event) {
    if (!this.isMost()) return
    for (let i = 0; i < this.data.prizes.length; i++) {
      this.data.prizes[i].probability = parseFloat(this.data.prizes[i].probability)
    }
    const data = {
      lotteryInfo: this.data.lotteryInfo,
      prizes: this.data.prizes
    }
    data.lotteryInfo.startTime = new Date(data.lotteryInfo.startTime.replace(/-/g, '/')).getTime();
    data.lotteryInfo.endTime = new Date(data.lotteryInfo.endTime.replace(/-/g, '/')).getTime();
    if (this.data.id) data.lotteryId = this.data.id
    dd.showLoading()
    request({
      url: this.data.id ? 'api/lottery/edit' : 'api/lottery/create',
      type: 'post',
      params: data
    }).then(res => {
      dd.hideLoading()
      if (res.status !== 200) {
        return dd.showToast({
          content: res.message,
          type: 'fail'
        })
      }
      dd.showToast({
        content: this.data.id ? '修改成功' : '新增成功',
        type: 'success',
        duration: 3000,
        success: () => {
          dd.navigateTo({
            url: `/pages/detail/index?id=${res.data.lotteryId}`
          })
        }
      })
    }).catch(err => {
      dd.hideLoading()
    })
  },
  onLoad(query) {
    // 页面加载
    // query.id = '60485667183f5d0009ecffa6'
    if (!query.id) return
    this.setData({
      id: query.id
    })
    let prizesData = {
      title: "",
      totalCount: '',
      leftCount: '',
      probability: '',
      noDisabled: true
    }
    request({
      url: `api/lottery?lotteryId=${query.id}`,
      type: 'get',
    }).then(res => {
      let lotteryInfo = res.data.lottery[0]
      lotteryInfo.winningOnce = lotteryInfo.winning_once
      lotteryInfo.lotTimes = lotteryInfo.lot_times
      lotteryInfo.ruleDesc = lotteryInfo.rule_desc
      lotteryInfo.startTime = moment(lotteryInfo.start_time).format('YYYY-MM-DD HH:mm');
      lotteryInfo.endTime = moment(lotteryInfo.end_time).format('YYYY-MM-DD HH:mm');

      let prizes = []
      if (!res.data.prizes.length) {
        prizes.push(prizesData)
      } else prizes = res.data.prizes
      this.setData({
        lotteryInfo: lotteryInfo,
        prizes: prizes
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
    }
  },
})
