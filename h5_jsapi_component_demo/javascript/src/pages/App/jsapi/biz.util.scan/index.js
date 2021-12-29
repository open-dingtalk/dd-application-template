import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.util.scan().then(res => {
        dd.device.notification.alert({
            title: '扫码结果',
            message: res.text,
        });
      });
    }

  return (
    <Button onClick={onHandleClick}>获取扫码结果（模拟器mock）</Button>
  );
};

export default ApiComponent;