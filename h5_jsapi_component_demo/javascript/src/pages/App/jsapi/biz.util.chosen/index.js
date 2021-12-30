import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.util.chosen({
        source:[{
            key: '选项1', //显示文本
            value: '123' //值，
        },{
            key: '选项2',
            value: '234'
        }],
        selectedKey:'选项2' , // 默认选中的key
      });
    }

  return (
    <Button onClick={onHandleClick}>下拉控件</Button>
  );
};

export default ApiComponent;