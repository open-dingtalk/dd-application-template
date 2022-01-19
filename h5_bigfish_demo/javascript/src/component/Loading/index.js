import React from '@alipay/bigfish/react';
import { Spin } from 'dingtalk-design-mobile';

export default function LoadingComponent() {
  return (
    <Spin delay={500} text="Loading...">
      <div style={{ minHeight: 700, width: '100vw' }} />
    </Spin>
  );
}
