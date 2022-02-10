import { getYear, times } from '../../util/utils';

const length = 26
const arr_leng_26 = new Array(length).fill(null)
const n = (48 - length - 2) / 2

Component({
  props: {
    item: {},
  },
  data: {
    arr_leng_26,
  },
  didMount() {
    const {
      item
    } = this.props
    const {
      arr_leng_26
    } = this.data
    const newArr_leng_26 = new Array(length).fill(null)
    arr_leng_26.map((s, index) => {
      const now = Date.now()
      const startHM = times[index + n * 2].content.split(' - ')[0]
      const endHM = times[index + n * 2].content.split(' - ')[1]
      if (new Date(`${getYear(now)} ${startHM}`).getTime() < now) {
        if (!newArr_leng_26[index]) {
          newArr_leng_26[index] = {}
        }
        newArr_leng_26[index].disabled = true
      }
      if (item.timeRanges) {
        item.timeRanges.forEach(range => {
          if (getYear(now) === getYear(range.endTime) && getYear(now) === getYear(range.startTime)) {
            if (
              new Date(`${getYear(range.endTime)} ${startHM}`).getTime() >= range.startTime
              && new Date(`${getYear(range.endTime)} ${endHM}`).getTime() <= range.endTime
            ) {
              if (!newArr_leng_26[index]) {
                newArr_leng_26[index] = {}
              }
              newArr_leng_26[index].selected = true
            }
          }
        })
      }
    })
    this.setData({
        arr_leng_26: newArr_leng_26
      })
  },
  methods: {
    
  }
})
