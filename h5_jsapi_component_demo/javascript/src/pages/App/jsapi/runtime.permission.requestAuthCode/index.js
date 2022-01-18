import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.notification.alert({
        title: '温馨提示',
        message: '模拟器环境为开发环境，不需要进行jsapi鉴权',
      });
      dd.runtime.permission.requestAuthCode({
        corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>获取授权码</Button>
  );
};

export default ApiComponent;