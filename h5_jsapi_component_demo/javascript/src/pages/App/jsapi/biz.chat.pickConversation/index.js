import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.chat.pickConversation({
        corpId: window.__corpId__,
      }).then(res => {
        dd.device.notification.alert({
          title: '已选择',
          message: res.title,
        });
      })
    }

  return (
    <Button onClick={onHandleClick}>选择聊天会话</Button>
  );
};

export default ApiComponent;