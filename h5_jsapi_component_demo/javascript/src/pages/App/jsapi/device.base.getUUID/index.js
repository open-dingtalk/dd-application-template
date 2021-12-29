import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.base.getUUID();
    }

  return (
    <Button onClick={onHandleClick}>获取uuid</Button>
  );
};

export default ApiComponent;