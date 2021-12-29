import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
        dd.biz.util.openLink({});
    }

  return (
    <Button onClick={onHandleClick}>打开链接（未实现）</Button>
  );
};

export default ApiComponent;