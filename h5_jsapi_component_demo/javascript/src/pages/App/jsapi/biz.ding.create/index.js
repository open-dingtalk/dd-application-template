import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.ding.create({
          corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>给自己发Ding</Button>
  );
};

export default ApiComponent;