import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.device.notification.actionSheet({
        title: "谁是最棒哒？", //标题
        cancelButton: '取消', //取消按钮文本
        otherButtons: ["孙悟空","猪八戒","唐僧","沙和尚"],
      });
    }

  return (
    <Button onClick={onHandleClick}>显示ActionSheet</Button>
  );
};

export default ApiComponent;