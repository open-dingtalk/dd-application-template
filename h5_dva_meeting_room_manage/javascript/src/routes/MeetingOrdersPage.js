import React, { useEffect, } from 'react';
import { connect } from 'dva';
import { List, Spin } from 'dingtalk-design-mobile';
import Timeline from '../components/Timeline';
import setTitleDD from 'dingtalk-jsapi/api/biz/navigation/setTitle';

import './MeetingOrdersPage.css';

const { Item } = List;

function MeetingOrdersPage(props) {
  const {
    meetings,
    loading,
    history,
  } = props;
  
  useEffect(() => {
    setTitleDD({
      title: '会议室预定',
    });
  }, []);

  return (
    <div className="meetingOrders">
        <Spin visible={loading.effects['app/fetchMeetings']} className="loading">
          <List>
            {
              meetings.map(item => (
                <Item
                  className="meetingItem"
                  key={item.id}
                  brief={
                    <>
                      <p>
                        <span>{item.num}人</span>
                        &nbsp;|&nbsp;
                        <span>{item.address}</span>
                      </p>
                      <Timeline item={item} />
                    </>
                  }
                  onClick={() => {
                    history.push(`/meetingOrder/${item.id}`);
                  }}
                >
                  {item.name}
                </Item>
              ))
            }
          </List>
        </Spin>
    </div>
  );
}

MeetingOrdersPage.propTypes = {
};

export default connect((state) => {
  return {
    meetings: state.app.meetings,
    loading: state.loading,
  };
})(MeetingOrdersPage);
