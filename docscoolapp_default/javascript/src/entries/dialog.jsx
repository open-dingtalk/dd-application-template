/*global Dingdocs*/
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { initView } from 'dingtalk-docs-cool-app';
import { Card, Button, Typography } from 'dingtalk-design-desktop';
import "./style.css";

function App() {
  useEffect(() => {
    initView({
      onReady: () => {
      },
    });
  }, []);

  const closeDialog = () => {
    Dingdocs.workbook.host.close();
  };
  return (
    <div className='page'>
      <div className='header'>
        <Typography.Text strong>欢迎使用钉钉文档酷应用</Typography.Text>
      </div>
      <div className='content'>
        <Card
          size={'small'}
          title={'关闭对话框'}
          extra={<Button
            type="primary"
            onClick={closeDialog}
            size={'small'}
          >
            测试功能
          </Button>}
        >
          <Typography.Text type={'secondary'}>点击测试功能关闭对话框。</Typography.Text>
        </Card>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root_dialog'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
