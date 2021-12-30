import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.util.datepicker({
        format: 'yyyy-MM-dd',//注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: '2018-03-26', //默认显示日期
      });
    }

  return (
    <Button onClick={onHandleClick}>日期选择器</Button>
  );
};

export default ApiComponent;