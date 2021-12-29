import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Form, InputItem, Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = (values) =>{
      dd.biz.chat.openSingleChat({
        corpId: window.__corpId__,
        userId: values.userId,
      }).then(res => {
        console.log('dd.biz.chat.openSingleChat', res);
        dd.device.notification.alert({
            title: '温馨提示',
            message: '输入的userId确认在该企业内（模拟器只校验输入的userId是否正确）'
        });
      })
    }

  return (
    <Form
        initialValues={{ userId: '' }}
        onFinish={(values) => onHandleClick(values)}
      >
        <Form.Group renderHeader="表单">
          <Form.Item label="UserId" name="userId">
            <InputItem placeholder="请输入联系人的userId" clear maxLength={50}/>
          </Form.Item>
        </Form.Group>
        <Button type="primary" htmlType="submit">
            提交
        </Button>
      </Form>
  );
};

export default ApiComponent;