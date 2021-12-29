import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.util.open({
        name: '测试',
        params: { a: '1', },
      });
    }

  return (
    <Button onClick={onHandleClick}>打开应用内页面（模拟器不支持）</Button>
  );
};

export default ApiComponent;