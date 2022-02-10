import React, { useCallback } from 'react';
import { Button, } from 'dingtalk-design-mobile';
import confirm from 'dingtalk-jsapi/api/device/notification/confirm';

import './itemButton.css';

const Edit = ({ item, onEdit }) => {
  return (
    <Button
      className="edit"
      type="primary"
      size="small"
      onClick={onEdit}
    >
      编辑
    </Button>
  );
};

const Delete = ({ item, callback}) => {
  const del = useCallback(() => {
    
    callback && callback()
  }, [item.id]);
  const deleteItem = useCallback(() => {
    confirm({
        message: '删除后不可恢复',
        title: `是否确认删除会议室(${item.name})`,
        buttonLabels: ['取消', '删除'],
        onSuccess: (result) => {
            if (result && result.buttonIndex === 1) {
                del();
            }
        },
        onFail: (err) => {
            Toast.error('err', err);
        }
    });
  }, [item.name]);

  return (
    <Button type="danger" size="small" onClick={deleteItem}>
      删除
    </Button>
  );
};

export {
  Edit,
  Delete
};
