import React from '@alipay/bigfish/react';
import { Link } from '@alipay/bigfish';
import classnames from '@alipay/bigfish/util/classnames';

import styles from './index.less';

const Card = ({ className = '', title = '', ...restProps }) => (
  <div className={classnames(className, styles.card)} {...restProps}>{title}</div>
);

const Index = () => {
  return (
    <div
      className={styles.index}
    >
      <Link to="/other">
        <Card title="Dingtalk" />
      </Link>
    </div>
  );
};
export default Index;
