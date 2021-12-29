import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleShow = () =>{
      dd.device.notification.showPreloader({
          text: '加载中...',
      }).then(() => {
          setTimeout(() => {
            onHandleHide();
          }, 2000);
      });
    }

    const onHandleHide = () =>{
      dd.device.notification.hidePreloader();
    }

  return (
    <>
        <Button onClick={onHandleShow}>显示加载</Button>
        <Button onClick={onHandleHide}>隐藏加载</Button>
    </>
  );
};

export default ApiComponent;