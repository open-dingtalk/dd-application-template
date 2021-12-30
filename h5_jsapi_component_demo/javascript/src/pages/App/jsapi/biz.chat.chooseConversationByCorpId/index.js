import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.chat.chooseConversationByCorpId({
        corpId: window.__corpId__,
      })
    }

  return (
    <Button onClick={onHandleClick}>选择聊天会话</Button>
  );
};

export default ApiComponent;