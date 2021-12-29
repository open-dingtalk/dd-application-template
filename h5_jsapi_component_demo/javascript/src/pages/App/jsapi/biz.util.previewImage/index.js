import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = () =>{
      dd.biz.util.previewImage({
          urls: [
            'https://img.alicdn.com/imgextra/i4/O1CN01cpkWx31eZpoGTLBZL_!!6000000003886-2-tps-760-416.png',
            'https://img.alicdn.com/imgextra/i2/O1CN01DIivmA1IS7ajeg9uz_!!6000000000891-2-tps-760-416.png',
            'https://img.alicdn.com/imgextra/i1/O1CN01qY9HCg22C427AImsr_!!6000000007083-2-tps-760-416.png',
            'https://img.alicdn.com/imgextra/i1/O1CN016Yc3m31CDZJf1qjVc_!!6000000000047-2-tps-760-416.png',
          ],
          current: 'https://img.alicdn.com/imgextra/i4/O1CN01cpkWx31eZpoGTLBZL_!!6000000003886-2-tps-760-416.png',
      });
    }

  return (
    <Button onClick={onHandleClick}>预览图片</Button>
  );
};

export default ApiComponent;