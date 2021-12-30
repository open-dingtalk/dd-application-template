import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.calendar.chooseDateTime({
        default: 1522022400000,
      });
    }

  return (
    <Button onClick={onHandleClick}>选择某时间</Button>
  );
};

export default ApiComponent;