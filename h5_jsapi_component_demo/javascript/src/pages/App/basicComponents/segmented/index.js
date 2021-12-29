import React, { useState, useCallback } from 'react';
import { SegmentedControl, WingBlank, Divider } from 'dingtalk-design-mobile';

const Segmented = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const onChange = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);
  return (
    <WingBlank size="sm">
      <Divider text="4 个选项(受控)"></Divider>
      <SegmentedControl
        texts={['选项1', '选项2', '选项3', '选项4']}
        activeIndex={activeIndex}
        onChange={onChange}
      />
      <Divider text="默认选中第二个"></Divider>
      <SegmentedControl texts={['选项1', '选项2']} defaultActiveIndex={1} />
      <Divider text="不可用"></Divider>
      <SegmentedControl texts={['选项1', '选项2']} disabled={true} />
    </WingBlank>
  );
};

export default Segmented;