import React from 'react';
import { Collapse } from 'antd';
import DetailedItem from './DetailedItem/DetailedItem';
function UnwrappingTabs() {
  const { Panel } = Collapse;
  console.log(Panel)
    // const buttonClick = (e) => {
    //     console.log("button clicked");
    // };
  return (
    <div>
      <DetailedItem />
    </div>
  );
}

export default UnwrappingTabs;