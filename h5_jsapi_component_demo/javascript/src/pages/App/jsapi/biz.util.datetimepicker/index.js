import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.util.datetimepicker({
        format: 'yyyy-MM-dd HH:mm',
        value: '2018-03-26 08:00', //默认显示
      });
    }

  return (
    <Button onClick={onHandleClick}>日期及时间选择器</Button>
  );
};

export default ApiComponent;