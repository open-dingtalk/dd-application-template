import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.base.getPhoneInfo();
    }

  return (
    <Button onClick={onHandleClick}>获取设备基本信息</Button>
  );
};

export default ApiComponent;