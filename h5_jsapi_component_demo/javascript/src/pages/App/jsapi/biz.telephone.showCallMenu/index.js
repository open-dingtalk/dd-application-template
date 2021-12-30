import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Form, InputItem, Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = (values) =>{
      dd.biz.telephone.showCallMenu({
        phoneNumber: values.phoneNumber,
        code: '+86',
      });
    }

  return (
    <Form
        initialValues={{ userId: '' }}
        onFinish={(values) => onHandleClick(values)}
      >
        <Form.Group renderHeader="表单">
          <Form.Item label="手机号" name="phoneNumber">
            <InputItem 
                // defaultValue="https://img.alicdn.com/imgextra/i4/O1CN01puz2pr1R3h1uPd30U_!!6000000002056-55-tps-191-32.svg" 
                placeholder="请输入需要拨打的手机号码" 
                clear 
                maxLength={50}
            />
          </Form.Item>
        </Form.Group>
        <Button type="primary" htmlType="submit">
            拨打
        </Button>
      </Form>
  );
};

export default ApiComponent;