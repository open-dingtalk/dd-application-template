/*global Dingdocs*/

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { initView } from 'dingtalk-docs-cool-app';
import { Typography, Button, Collapse, Card } from 'dingtalk-design-desktop';
import './style.css';

function App() {

  const [listen, setListen] = useState(false);
  let offContentChanged;

  // 计算签名详见钉钉开放平台开发者文档：https://open.dingtalk.com/document/isvapp/jsapi-authentication
  const config = {
    agentId: '', // 文档酷应用所属微应用ID
    corpId: '', // 企业ID
    timeStamp: '', // 生成签名的时间戳
    nonceStr: '', // 自定义固定字符串
    signature: '', // 签名
    jsApiList: ['DingdocsScript.workbook.readWriteAll'], // jsapi列表
  }
  
  useEffect(() => {
    initView({
      onReady: () => {
        Dingdocs.workbook.host.configPermission(config.agentId, config.corpId, config.timeStamp, config.nonceStr, config.signature, config.jsApiList);
      },
    });
    return () => {
      if (offContentChanged) offContentChanged();
    }
  }, []);

  // Insert sheet
  const insertSheet = () => {
    Dingdocs.script.run('insertSheet').catch((e) => console.error(e));
  };

  // Set cell value
  const setCellValue = () => {
    Dingdocs.script.run('setCellValue', 'A1', 123).then((d) => console.log(d));
  }

  // Open dialog
  const showDialog = () => {
    // eslint-disable-next-line no-restricted-globals
    const origin = location.origin;
    Dingdocs.workbook.host.showDialog(
      `${origin}/dialog.html`,
      { width: 600, height: 300 },
    ).then((view) => {
      view.onMessageReceived((data) => {
        console.log(data);
      });
    }).catch((e) => console.error(e));
  };

  // Listen for changes on document
  const contentChange = () => {
    setListen(true);
    offContentChanged = Dingdocs.workbook.event.onContentChanged(({ sheetId, a1Notation }) => {
      console.log('ContentChanged', sheetId, a1Notation);
      Dingdocs.script.run('setBackground', sheetId, a1Notation);
    })
  };

  return (
    <div className='page'>
      <div className='header'>
        <Typography.Text strong>欢迎使用钉钉文档酷应用</Typography.Text>
      </div>
      <div className='content'>
        <Collapse expandIconPosition={'right'}>
          <Collapse.Panel header={'修改文档内容'}>
            <Card
              size={'small'}
              title={'新增表格'}
              extra={<Button
                type="primary"
                onClick={insertSheet}
                size={'small'}
              >
                测试功能
              </Button>}
            >
            <Typography.Text type={'secondary'}>在当前文档中创建一个新表格。</Typography.Text>
            </Card>
            <div className='line'/>
            <Card
              size={'small'}
              title={'填写数据'}
              extra={<Button
                type="primary"
                onClick={setCellValue}
                size={'small'}
              >
                测试功能
              </Button>}
            >
            <Typography.Text type={'secondary'}>在当前激活表格的A1单元格中填入数字123。</Typography.Text>
            </Card>
          </Collapse.Panel>
          <Collapse.Panel header={'展开对话框'}>
            <Card
                size={'small'}
                title={'展开对话框'}
                extra={<Button
                  type="primary"
                  onClick={showDialog}
                  size={'small'}
                >
                  测试功能
                </Button>}
              >
              <Typography.Text type={'secondary'}>展示对话框式交互界面。</Typography.Text>
            </Card>
          </Collapse.Panel>
          <Collapse.Panel header={'监听表格操作'}>
            <Card
                size={'small'}
                title={'监听表格操作'}
                extra={<Button
                  type={listen ? undefined : 'primary'}
                  onClick={contentChange}
                  size={'small'}
                  disabled={listen}
                >
                  {listen ? '启用功能' : '测试功能'}
                </Button>}
              >
              <Typography.Text type={'secondary'}>点击测试功能，开始监听文档操作，将修改过的单元格背景色置为红色，并在控制台打印单元格位置。</Typography.Text>
            </Card>
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root_sidebar'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
