import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.base.getWifiStatus().then(res => {
        dd.device.notification.alert({
            title: 'wifi状态',
            message: res.status,
        });
      });
    }

  return (
    <Button onClick={onHandleClick}>获取wifi状态</Button>
  );
};

export default ApiComponent;