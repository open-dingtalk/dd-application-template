import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.connection.getNetworkType()
      .then(res => {
          dd.device.notification.alert({
              title: '温馨提示',
              message: res.result,
          });
      });
    }

  return (
    <Button onClick={onHandleClick}>获取网络状态(wifi or none)</Button>
  );
};

export default ApiComponent;