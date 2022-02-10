import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'dva';
import { List, Button, Spin, } from 'dingtalk-design-mobile';
import { Edit, Delete } from '../components/itemButton';
import setTitleDD from 'dingtalk-jsapi/api/biz/navigation/setTitle';
import './ManagePage.css';

const { Item, } = List;

function ManagePage(props) {
  const { 
    loading,
    history,
    meetings,
    dispatch,
  } = props;

  useEffect(() => {
    setTitleDD({
      title: '会议室管理',
    });
  }, []);

  const add = useCallback(() => {
    history.push(`/manage/new`);
  });

  const handleEdit = (item) => {
    history.push(`/manage/${item.id}`);
  };

  const deleteCallback = (item) => {
    const params = {
      id: item.id
    };
    dispatch({
      type: 'app/deleteRoom',
      payload: params,
    });
  };

  return (
    <div className="manage-page">
      <Spin visible={loading.effects['app/fetchListRoom']} className="loading">
        <List>
          {
            meetings.map(item => (
              <Item
                className="meetingItem"
                key={item.id}
                brief={
                  <>
                    <span>{item.num}人</span>
                    &nbsp;|&nbsp;
                    <span>{item.address}</span>
                  </>
                }
                extra={
                  <>
                    <Edit item={item} onEdit={() => handleEdit(item)} />
                    <Delete item={item} callback={() => deleteCallback(item)} />
                  </>
                }
              >
                {item.name}
              </Item>
            ))
          }
        </List>
        <Button onClick={add} className="addMeeting" type="primary">新增会议室</Button>
      </Spin>
    </div>
  );
}

ManagePage.propTypes = {
};

export default connect((state) => {
  return {
    meetings: state.app.meetings,
    loading: state.loading,
  };
})(ManagePage);
