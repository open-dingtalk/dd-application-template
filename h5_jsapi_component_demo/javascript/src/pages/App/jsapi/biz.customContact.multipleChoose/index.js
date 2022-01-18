import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Button, Form, InputItem, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = (values) =>{
      dd.biz.customContact.multipleChoose({
          corpId: window.__corpId__,
          users: values.userIds.split(','),
          disabledUsers: [],
      });
    }

  return (
    <Form
        initialValues={{ userId: '' }}
        onFinish={(values) => onHandleClick(values)}
      >
        <Form.Group renderHeader="表单">
          <Form.Item label="UserIds" name="userIds" position="brief">
            <InputItem placeholder="请输入多个联系人的userId，按,分隔" clear maxLength={50}/>
          </Form.Item>
        </Form.Group>
        <Button type="primary" htmlType="submit">
            多选自定义联系人
        </Button>
      </Form>
  );
};

export default ApiComponent;