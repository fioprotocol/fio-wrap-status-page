import React from 'react';
import { Button } from 'antd';
import DetailedItem from './DetailedItem/DetailedItem';
import web3 from '../config/config';
import axios from 'axios';
import { BACK_URL } from '../config/config-testnet';
function UnwrappingTabs() {
  const refreshData = async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8008/fio-backend/blocknumber/ethereum',
    });
    console.log(response);
    // const blockNumber = 
  };
  return (
    <div>
      <Button type="primary" onClick={refreshData}>Refresh</Button>
      <DetailedItem />
    </div>
  );
}

export default UnwrappingTabs;