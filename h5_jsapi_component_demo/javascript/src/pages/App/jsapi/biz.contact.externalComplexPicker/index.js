import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.contact.externalComplexPicker({
          corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>选择外部联系人</Button>
  );
};

export default ApiComponent;