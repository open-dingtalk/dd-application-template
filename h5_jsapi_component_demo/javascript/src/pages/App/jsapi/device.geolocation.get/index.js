import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
        dd.device.geolocation.get({
    
        });
    }

  return (
    <Button onClick={onHandleClick}>获取定位</Button>
  );
};

export default ApiComponent;