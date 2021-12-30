import React, { useState, useCallback } from 'react';
import * as dd from 'dingtalk-jsapi';
import { Form, InputItem, Button, } from 'dingtalk-design-mobile';

const ApiComponent = () => {
    const onHandleClick = (values) =>{
      dd.biz.cspace.saveFile({
        corpId: window.__corpId__,
        url: values.url,
        name: values.fileName,
      });
    }

  return (
    <Form
        initialValues={{ userId: '' }}
        onFinish={(values) => onHandleClick(values)}
      >
        <Form.Group renderHeader="表单">
          <Form.Item label="Url" name="url" initialValue="https://img.alicdn.com/imgextra/i4/O1CN01puz2pr1R3h1uPd30U_!!6000000002056-55-tps-191-32.svg">
            <InputItem 
                // defaultValue="https://img.alicdn.com/imgextra/i4/O1CN01puz2pr1R3h1uPd30U_!!6000000002056-55-tps-191-32.svg" 
                placeholder="请输入待上传到钉盘的文件地址" 
                clear 
                maxLength={50}
            />
          </Form.Item>
          <Form.Item label="Name" name="fileName">
            <InputItem placeholder="请输入待上传到钉盘的文件名称" clear maxLength={50}/>
          </Form.Item>
        </Form.Group>
        <Button type="primary" htmlType="submit">
            上传到私人盘
        </Button>
      </Form>
  );
};

export default ApiComponent;