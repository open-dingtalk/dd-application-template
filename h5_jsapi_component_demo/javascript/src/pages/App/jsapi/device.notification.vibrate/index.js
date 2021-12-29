import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
        dd.device.notification.vibrate();
    }

    return (
        <Button onClick={onHandleClick}>手机震动</Button>
    );
};

export default ApiComponent;