import React from 'react';
import { Avatar } from 'antd';
import { get } from 'lodash';

function H5AppQSUser(props) {
  return (
    <div className="user" style={get(props, 'style')}>
      <Avatar size="large" icon="user" src={get(props, 'user.avatar')} />
      <span className="user-detail">
        <span>{get(props, 'user.name')}</span> (<span>{get(props, 'user.userid')}</span>)
      </span>
    </div>
  );
}

export default H5AppQSUser;
