import { Toast } from "dingtalk-design-mobile";
import moment from "moment";
import pathToRegexp from "path-to-regexp";
import request  from "../utils/request";
import { times, getYear, getDateArray } from '../utils/utils';

export default {

  namespace: 'app',

  state: {
    meetings: [],
    room: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname;

        const matchMeetingOrder = pathToRegexp('/meetingOrder/:id').exec(pathname);
        if (pathname === '/meetingOrders') {
          dispatch({
            type: 'fetchMeetings',
          });
        } else if (matchMeetingOrder) {
          dispatch({
            type: 'fetchOneRoom',
            payload: {
              id: matchMeetingOrder[1],
              day: moment(Date.now()).format('YYYY年MM月DD日'),
            }
          });
        } else if (pathname === '/myOrder') {
          dispatch({
            type: 'fetchUserOrderRooms',
            payload: {
              a: 1
            },
          });
        } else if (pathname === '/manage') {
          dispatch({
            type: 'fetchListRoom',
            payload: {
              a: 1,
            },
          });
        }
      });
    },
  },

  effects: {
    * fetchMeetings({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/list_full_room');
      } catch (err) {
        Toast.error('获取失败');
      }
      yield put({
        type: 'save',
        payload: {
          meetings: res.result.meetings,
        },
      });
    },
    * fetchOneRoom({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/list_one_room', payload);
      } catch (err) {
        Toast.error('获取失败');
      }

      const checkedTimes = {};
      times.forEach(item => {
        let selected = false;
        const now = Date.now();
        const startHM = item.content.split(' - ')[0];
        const endHM = item.content.split(' - ')[1];
        if (res && res.result && res.result.room && res.result.room.timeRanges) {
          res.result.room.timeRanges.forEach(range => {
            if (
              getYear(now) === getYear(range.endTime) &&
              getYear(now) === getYear(range.startTime)
            ) {
              if (
                new Date(...getDateArray(range.endTime, startHM)).getTime() >=
                  range.startTime &&
                new Date(...getDateArray(range.endTime, endHM)).getTime() <= range.endTime
              ) {
                selected = true;
              }
            }
          });
        }
        checkedTimes[item.value] = selected;
      });
      yield put({
        type: 'save',
        payload: {
          room: res.result.room,
          checkedTimes,
        },
      });
    },
    * orderRoom({ payload, callback }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/order_room', payload);
        if (res.success) {
          callback && callback();
        }
      } catch (err) {
        Toast.error('预定失败');
      }
    },
    * fetchUserOrderRooms({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/get_user_order_rooms', payload);
      } catch (err) {
        Toast.error('获取失败');
      }
      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            meetings: res.result.meetings,
          },
        });
      }
    },
    * cancelOrder({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/cancel_order', payload);
      } catch (err) {
        Toast.error('取消预订失败');
      }
      if (res.success) {
        yield put({
          type: 'fetchUserOrderRooms',
          payload: {
            a: 1,
          },
        });
      }
    },
    * deleteRoom({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/delete_room', payload);
      } catch (err) {
        Toast.error('删除失败');
      }
      if (res.success) {
        yield put({
          type: 'fetchListRoom',
          payload: {
            a: 1,
          },
        });
      }
    },
    * fetchListRoom({ payload }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/list_room', payload);
      } catch (err) {
        Toast.error('获取失败');
      }
      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            meetings: res.result.meetings,
          },
        });
      }
    },
    * updateRoom({ payload, callback }, { call, put }) {
      let res;
      try {
        res = yield call(request, 'room/update_room', payload);
      } catch (err) {
        Toast.error('更新失败');
      }
      if (res.success) {
        callback && callback();
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
