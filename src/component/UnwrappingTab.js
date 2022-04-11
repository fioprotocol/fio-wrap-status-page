import React from 'react';
import { Collapse } from 'antd';
import DetailedItem from './DetailedItem/DetailedItem';
import {INFURA_URL} from '../config/config-testnet';
import Web3 from 'web3';
function UnwrappingTabs() {
  const { Panel } = Collapse;
    // const buttonClick = (e) => {
    //     console.log("button clicked");
    // };
  const web3 = new Web3(INFURA_URL);
  console.log(INFURA_URL);
  return (
    <div>
      <DetailedItem />
    </div>
  );
}

export default UnwrappingTabs;