import React from 'react';
import { Collapse } from 'antd';
import DetailedItem from './DetailedItem/DetailedItem';
import web3 from '../config/config'
function UnwrappingTabs() {
  console.log(web3);
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