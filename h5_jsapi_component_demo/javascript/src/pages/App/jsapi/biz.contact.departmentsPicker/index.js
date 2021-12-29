import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.contact.departmentsPicker({
          corpId: window.__corpId__,
      });
    }

  return (
    <Button onClick={onHandleClick}>选择部门</Button>
  );
};

export default ApiComponent;