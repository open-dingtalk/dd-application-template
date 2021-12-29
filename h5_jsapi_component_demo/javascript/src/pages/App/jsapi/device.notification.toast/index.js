import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.notification.toast({
          text: '测试',
      });
    }

  return (
    <Button onClick={onHandleClick}>Toast</Button>
  );
};

export default ApiComponent;