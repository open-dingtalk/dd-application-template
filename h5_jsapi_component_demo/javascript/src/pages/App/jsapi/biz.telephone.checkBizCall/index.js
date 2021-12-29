import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.telephone.checkBizCall({
          corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>检查某企业的办公电话开通状态</Button>
  );
};

export default ApiComponent;