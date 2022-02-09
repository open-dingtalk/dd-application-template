import React, {useEffect} from 'react';
import { connect } from 'dva';
import { Link, } from 'dva/router';
import setTitleDD from 'dingtalk-jsapi/api/biz/navigation/setTitle';

import './IndexPage.css';

const Card = ({ className = '', title = '', ...restProps }) => (
  <div className={`${className} card`} {...restProps}>{title}</div>
);

function IndexPage() {
  useEffect(() => {
    setTitleDD({
      title: '会议室管理',
    });
  }, []);

  return (
    <div
      className="index"
    >
      <Link to="/meetingOrders">
        <Card title="会议室预定" className="reserve" />
      </Link>
      <Link to="/myOrder">
        <Card title="我的预定" className="myReserve" />
      </Link>
      <Link to="/manage">
        <Card title="会议室管理" className="manage" />
      </Link>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
