import moment from 'moment'
import request from '../../util/request.js'
import { times, getYear } from '../../util/utils';

Page({
  data: {
    room: {},
    reverveDate: moment().format('YYYY-MM-DD'),
    switchShow: false,
    times: [],
    filtedTimes: [],
    allTimes: [],
  },
  onLoad(query) {
    // 页面加载
    this.getData();
  },
  getData() {
    request({
      url: 'room/list_one_room',
    }).then(res => {
      const room = res.result.room
      this.setData({
        room,
      })

      times.forEach((item, index) => {
        const now = Date.now();
        const startHM = item.content.split(' - ')[0];
        const endHM = item.content.split(' - ')[1];
        if (new Date(`${this.data.reverveDate} ${startHM}`).getTime() < now) {
          item.disabled = true;
        }
        if (room.timeRanges) {
          room.timeRanges.forEach(range => {
            if (
              getYear(now) === getYear(range.endTime) &&
              getYear(now) === getYear(range.startTime)
            ) {
              if (
                new Date(`${getYear(range.endTime)} ${startHM}`).getTime() >=
                  range.startTime &&
                new Date(`${getYear(range.endTime)} ${endHM}`).getTime() <= range.endTime
              ) {
                item.disabled = true;
              }
            }
          });
        }
      })
      const filtedTimes = times.filter(i => !i.disabled)
      this.setData({
        times: filtedTimes,
        filtedTimes,
        allTimes: times
      })
    }).catch(err => {
      console.error(err)
    })
  },
  // 选择日期
  datePicker(e) {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: moment().format('YYYY-MM-DD'),
      startDate: moment().subtract(1, 'Y'),
      endDate: moment().add(1, 'Y'),
      success: (res) => {
        e.detail.value = res.date
        this.setData({
          reverveDate: res.date
        })
      },
    })
  },
  switchChange(e) {
    this.setData({
      switchShow: e.detail.value
    })
    if (e.detail.value) {
      this.setData({
        times: this.data.filtedTimes
      })
    } else {
      this.setData({
        times: this.data.allTimes
      })
    }
  },
  onItemClick(e) {

  },
  onOrder(e) {
    // 拓展：请开发者自行完善保存会议室预定部分
    // 相关参数
    const params = {}
    request({
      url: 'room/order_room',
      type: 'post',
      params,
    }).then((res) => {
      if (res.success) {
        // 保存成功
      }
    }).catch(error => {
      console.error(error)
      dd.alert({
          title: res.message,
          content: error,
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
