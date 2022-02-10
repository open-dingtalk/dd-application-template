import React, { useEffect } from 'react';
import { connect } from 'dva';
import { List, Spin, Button, Toast } from 'dingtalk-design-mobile';
import setTitleDD from 'dingtalk-jsapi/api/biz/navigation/setTitle';
import confirm from 'dingtalk-jsapi/api/device/notification/confirm';
import { getRangeStrWithSeconds } from '../utils/utils';
import './MyOrderPage.css';

const { Item } = List;

function MyOrderPage(props) {
  const { 
    loading,
    meetings,
    dispatch,
  } = props;

  useEffect(() => {
    setTitleDD({
      title: '我的预定',
    });
  }, []);

  const CancelBtn = ({ item }) => {
    const { room } = item;
    const cancelOrder = () => {
      const params = {
        id: room.id
      };
      dispatch({
          type: 'app/cancelOrder',
          payload: params,
      })
    };
    const cancelOrderItem = () => {
    confirm({
        message: '取消预定后会议室将被释放',
        title: `是否确认取消预定(${room.name})`,
        buttonLabels: ['取消', '确认'],
        onSuccess: (result) => {
            if (result && result.buttonIndex === 1) {
                cancelOrder();
            }
        },
        onFail: (err) => {
            Toast.error('err', err);
        }
    });
    };
  
    return (
      <Button type="danger" size="small" onClick={cancelOrderItem}>
        取消预定
      </Button>
    );
  }
  
  return (
    <div className="myOrder">
      <Spin visible={loading.effects['app/fetchUserOrderRooms']} className="loading">
        <List>
            {
              meetings.length ? meetings.map(item => (
                <Item
                  className="meetingItem"
                  key={item.id}
                  brief={
                    <div>
                      <p>
                        <span>{item?.room?.num}人</span>
                        &nbsp;|&nbsp;
                        <span>{item?.room?.address}</span>
                      </p>
                      <div>{getRangeStrWithSeconds(item.startTime, item.endTime)}</div>
                    </div>
                  }
                  extra={<CancelBtn item={item} />}
                >
                  {item?.room?.name}
                </Item>
              )) : (
                <span>暂无预定</span>
              )
            }
          </List>
      </Spin>
    </div>
  );
};

MyOrderPage.propTypes = {
};

export default connect((state) => {
  return {
    meetings: state.app.meetings,
    loading: state.loading,
  };
})(MyOrderPage);
