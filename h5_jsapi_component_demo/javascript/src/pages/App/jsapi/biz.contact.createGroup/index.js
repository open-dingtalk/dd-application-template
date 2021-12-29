import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.contact.createGroup({
          corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>创建企业群</Button>
  );
};

export default ApiComponent;