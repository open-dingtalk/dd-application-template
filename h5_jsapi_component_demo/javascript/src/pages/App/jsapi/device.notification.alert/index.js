import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.notification.alert({
          title: '测试标题',
          message: '测试内容',
      });
    }

  return (
    <Button onClick={onHandleClick}>Alert</Button>
  );
};

export default ApiComponent;