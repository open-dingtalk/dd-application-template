import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.cspace.chooseSpaceDir({
          corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>选择钉盘目录</Button>
  );
};

export default ApiComponent;