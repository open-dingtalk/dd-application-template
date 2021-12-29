import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.contact.complexPicker({
          corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>选人组件</Button>
  );
};

export default ApiComponent;