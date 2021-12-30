import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.navigation.goBack();
    }

  return (
    <Button onClick={onHandleClick}>返回上一页（模拟器行为为刷新页面）</Button>
  );
};

export default ApiComponent;