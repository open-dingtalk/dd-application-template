import React from 'react';
import { PageContainer, Form, InputItem, Select, SegmentedControl, Switch, Upload, Radio, Checkbox } from 'dingtalk-design-mobile';
import './index.less';

const { Item } = Form;

const FormPage: React.FC = () => {

  const initialValues = {
    attachments: [{
      uid: '1',
      name: '附件标题文字.pdf',
      status: 'done',
      size: 40888, // 单位是bytes
      type: "application/pdf",
      response: 'Server Error 500', // custom error message to show
      url: 'https://img.alicdn.com/imgextra/i4/O1CN018gLxCK1F2WfFERgnl_!!6000000000429-2-tps-96-96.png',
    },
    {
      uid: '2',
      name: '附件标题文字，当文字过长时最多显示两行.mp4',
      status: 'done',
      type: 'a',
      size: 4088, // 单位是bytes
      url: 'https://img.alicdn.com/imgextra/i3/O1CN01Ho73v21OKguWSyMyu_!!6000000001687-2-tps-96-96.png',
    }]
  };
  return (
    <PageContainer title="表单" className="container" hasBack strongMainAction actions={[
      {
        text: '确定',
        type: 'ok',
        onClick: () => console.log('onClick submit'),
      },
    ]}>
      <Form initialValues={initialValues}>
        <Form.Group renderHeader={<div>文本</div>}>
          <Item label="标题" name="c1" rules={[{ required: true }]}>
            <InputItem placeholder='请输入'/>
          </Item>
          <Item label="尺码" name="c3" rules={[{ required: true }]} position="brief">
            <Select
              mode="single"
              placeholder="尺码"
              title="尺码"
              onChange={(value, option) => console.log(value, option)}
              options={[
                {
                  label: 'small(小)',
                  value: 'small'
                },
                {
                  label: 'medium(中)',
                  value: 'medium'
                },
                {
                  label: 'large(大)',
                  value: 'large'
                }
              ]}
            />
          </Item>
          <Item label="标题" name="c2">
            <SegmentedControl 
              texts={['选项1', '选项2']}
              onChange={console.log}
            />
          </Item>
        </Form.Group>
        <Form.Group renderHeader={<div>文本</div>}>
          <Form.Item name="attachments">
            <Upload
              label="附件"
              type="form-upload"
              accept="*"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </Form.Item>
          <Form.Item name="image">
            <Upload
              label="图片"
              type="form-upload"
              accept="*"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            />
          </Form.Item>
          <Form.Item label="标题文字" name="a1" valuePropName="checked">
            <Switch onChange={console.log}></Switch>
          </Form.Item>
          <Form.Item label="手机号码" name="a2">
            <InputItem placeholder="请输入" type="tel" />
          </Form.Item>
        </Form.Group>
        <Radio.Group onChange={(value) => {
          console.log(value);
        }} renderHeader="单选">
          <Radio.Item value={1}>标题文案</Radio.Item>
          <Radio.Item value={2}>
            标题文案
          </Radio.Item>
          <Radio.Item value={3} disabled>
            标题文案
          </Radio.Item>
        </Radio.Group>
        <Checkbox.Group renderHeader="多选" defaultValue={[1]} onChange={(values) => {
          console.log('values', values);
        }}>
          <Checkbox.Item value={1} disabled>选项1</Checkbox.Item>
          <Checkbox.Item value={2}>选项2</Checkbox.Item>
          <Checkbox.Item value={3}>选项3</Checkbox.Item>
        </Checkbox.Group>
      </Form>
    </PageContainer>
  );
}

export default FormPage;

