import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.notification.confirm({
          title: '测试标题',
          message: '测试内容',
          buttonLabels: ['确认', '取消']
      });
    }

  return (
    <Button onClick={onHandleClick}>Confirm</Button>
  );
};

export default ApiComponent;