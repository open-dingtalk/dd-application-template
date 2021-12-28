import React from 'react';
import { WhiteSpace, WingBlank, Button, ActionSheet, Modal } from 'dingtalk-design-mobile';

const actionSheet = () => {
  const handle = (maskClosable, showTitle = true) => () => {
    ActionSheet.show(
      {
        title: '说明文字' ,
        items: ['普通行动点', '普通行动点', '普通行动点',  { value: '警示行动点', danger: true }],
        maskClosable: maskClosable,
      },
      res => console.log('callback', res),
    ).then(res => {
      console.log('promise', res)
      Modal.alert('结果', `第 ${res.index} 个被点击`);
    })
  }

  return (
    <div>
      <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={handle(true)}>
            点击唤起 ActionSheet
          </Button>
        </WingBlank>
        <WhiteSpace />
      <WhiteSpace />
    </div>
  );
};

export default actionSheet;