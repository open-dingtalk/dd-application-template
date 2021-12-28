import React from 'react';
import { Button, WingBlank, WhiteSpace } from 'dingtalk-design-mobile';

const button = () => (
  <div className="btn-container">
    <div className="content">
      <WingBlank>
        <WhiteSpace />
        <Button type="primary">一级按钮</Button>
        <br />
        <Button type="primary" disabled={true}>
          一级按钮
        </Button>
        <br />
        <Button type="primary" loading={true}>
          一级按钮
        </Button>
        <WhiteSpace />
      </WingBlank>
    </div>
    <div className="content">
      <WingBlank>
        <WhiteSpace />
        <Button onClick={(e) => console.log(e)}>次级按钮</Button>
        <br />
        <Button disabled={true}>次级按钮</Button>
        <br />
        <Button loading={true}>次级按钮</Button>
        <WhiteSpace />
      </WingBlank>
    </div>
    <WhiteSpace size="lg" />
    <div className="content">
      <WingBlank>
        <WhiteSpace />
        <Button type="danger" onClick={(e) => console.log(e)}>
          警告按钮
        </Button>
        <br />
        <Button type="danger" disabled={true}>
          警告按钮
        </Button>
        <br />
        <Button type="danger" loading={true}>
          警告按钮
        </Button>
        <WhiteSpace />
      </WingBlank>
    </div>
    <WhiteSpace size="lg" />
    <div className="content">
      <WingBlank>
        <WhiteSpace />
        <Button>大按钮（默认）</Button>
        <WhiteSpace />
        <Button size="middle" onClick={(e) => console.log(e)}>中按钮</Button>
        <WhiteSpace />
        <Button size="small" onClick={(e) => console.log(e)}>小按钮</Button>
        <WhiteSpace />
      </WingBlank>
    </div>
    <WhiteSpace size="lg" />
     <WingBlank className="btns-group">
      <Button size="large" inline={true} type="primary">
        大按钮
      </Button>
      <Button size="large" inline={true} loading={true}>
        大按钮
      </Button>
      <Button size="large" inline={true}>
        大按钮
      </Button>
    </WingBlank>
    <WhiteSpace size="lg" />
    <WingBlank className="btns-group">
      <Button inline={true} type="primary">
        中按钮
      </Button>
      <Button inline={true} loading={true}>
        中按钮
      </Button>
      <Button inline={true}>
        中按钮
      </Button>
    </WingBlank>
    <WhiteSpace size="lg" />
    <WingBlank className="btns-group">
      <Button inline={true} type="primary" size="small">
        小按钮
      </Button>
      <Button inline={true} size="small" loading={true}>小按钮</Button>
      <Button inline={true} size="small">
        小按钮
      </Button>
    </WingBlank>
    <WhiteSpace size="lg" />
  </div>
);

export default button;