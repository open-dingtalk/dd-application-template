import React from 'react';
import { connect } from 'dva';
import './IndexPage.css';

function IndexPage() {
  return (
    <div className="normal">
      <h1 className="title">Hi! 这是一个简单示例</h1>
      <div className="welcome" />
      <ul className="list">
        <li>可以从<code>src/index.js</code>继续您的开发</li>
        <li>更多参考：</li>
        <li><a href="https://open.dingtalk.com/document/org/application-types">钉钉开放平台应用开发</a></li>
        <li><a href="https://dvajs.com/">dva官网</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
