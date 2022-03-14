import React from 'react';
import { Collapse } from 'antd';
import DetailedItem from './DetailedItem/DetailedItem';
function WrappingTabs() {
  const { Panel } = Collapse;
  console.log(Panel);
  return (
    <div>
      <DetailedItem />
      <DetailedItem />
    </div>
  );
}

export default WrappingTabs;
