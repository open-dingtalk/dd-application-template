import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'dva';
import { List, Switch, Checkbox, Button, DatePicker, Toast } from 'dingtalk-design-mobile';
import setTitleDD from 'dingtalk-jsapi/api/biz/navigation/setTitle';
import { times, getStartTime, getEndTime, getYear, getDateArray } from '../utils/utils';
import moment from 'moment';
import './MeetingOrderPage.css';

const { Item } = List;

function MeetingOrderPage(props) {
  const { 
    room,
    checkedTimes = {},
    dispatch,
    match,
    history,
  } = props;

  const [showOrder, setShowOrder] = useState(true);
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    setTitleDD({
      title: '会议室预定',
    });
  }, []);

  const dateChange = useCallback(mome => {
    setDate(mome);
  }, []);

  const showOrderChange = useCallback(v => {
    setShowOrder(v);
  }, []);

  const onOrder = () => {
    const timeValueArr = Object.keys(checkedTimes);
    if (timeValueArr.length === 0) {
      Toast.show('请选择预定时间段');
    } else {
      const year = moment(date).format('YYYY-MM-DD');
      const start = Math.min(...timeValueArr);
      const end = Math.max(...timeValueArr);
      const startTime = new Date(...getDateArray(year, getStartTime(start))).getTime();
      const endTime = new Date(...getDateArray(year, getEndTime(end))).getTime();
      const { id: roomId } = match.params;
      const params = {
        roomId,
        startTime,
        endTime,
      };
      dispatch({
        type: 'app/orderRoom',
        payload: params,
        callback: () => {
          history.push('/myOrder');
        },
      });
    }
  }

  const timeChange = useCallback(
    (v, id) => {
      let originCheckedTimes = { ...checkedTimes };
      originCheckedTimes[id] = v;
      dispatch({
        type: 'app/save',
        payload: {
          checkedTimes: originCheckedTimes
        }
      })
    },
    [checkedTimes],
  );

  return (
    <div className="meetingOrder">
      <List>
        <Item
          className="listItem"
          brief={
            <>
              <span>{room.num}人</span>
              &nbsp;|&nbsp;
              <span>{room.address}</span>
            </>
          }
        >
          {room.name}
        </Item>
        <DatePicker
          value={new Date(date)}
          mode="date"
          format={(value) => moment(value).format('YYYY-MM-DD')}
          onChange={dateChange}
        >
          <List.Item arrow="horizontal">选择日期</List.Item>
        </DatePicker>
        <Item
          className="listItem timepicker"
          extra={
            <div>
              <Switch checked={showOrder} onChange={showOrderChange} />
            </div>
          }
        >
          <span className="timepicker-hint">只显示可预订时段</span>
        </Item>
        
        <Item className="listItem timeWrapper">
          <List>
            {times.map(item => {
              let disabled = false;
              const now = Date.now();
              const startHM = item.content.split(' - ')[0];
              const endHM = item.content.split(' - ')[1];
              if (new Date(...getDateArray(date, startHM)).getTime() < now) {
                disabled = true;
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
                      disabled = true;
                    }
                  }
                });
              }
              if (showOrder && disabled) {
                return null;
              }
              return (
                <Item
                  key={item.value}
                  extra={
                    <Checkbox
                      disabled={disabled}
                      checked={checkedTimes[item.value]}
                      onChange={v => timeChange(v, item.value)}
                    />
                  }
                >
                  {item.content}
                </Item>
              );
            })}
          </List>
        </Item>
      </List>
      <Button onClick={onOrder} className="orderBtn" type="primary">
        立即预定
      </Button>
    </div>
  );
}

MeetingOrderPage.propTypes = {
};

export default connect((state) => {
  return {
    room: state.app.room,
    checkedTimes: state.app.checkedTimes,
    loading: state.loading,
  };
})(MeetingOrderPage);
