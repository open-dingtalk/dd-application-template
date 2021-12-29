import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.util.timepicker({
        format: 'HH:mm',
        value: '14:00', //默认显示时间  0.0.3
      });
    }

  return (
    <Button onClick={onHandleClick}>时间选择器</Button>
  );
};

export default ApiComponent;