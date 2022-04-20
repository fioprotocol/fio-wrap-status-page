import React, {useState} from 'react';
import { Button } from 'antd';
import UnwrapItem from './UnwrapItem/UnwrapItem';
import web3 from '../config/config';
import axios from 'axios';
import { BACK_URL } from '../config/config-testnet';
import FIOABI from '../config/ABI/FIO.json';
import contractAdd from '../config/contracts_testnet';
function UnwrappingTabs() {
  const fioContract = new web3.eth.Contract(FIOABI, contractAdd.FIO_token);
  const [unwrapData, setUnwrapData] = useState([]);
  const refreshData = async () => {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:8008/fio-backend/blocknumber/ethereum',
    });
    const blockNumber = response.data.blockNumber;
    console.log(fioContract);
    fioContract.getPastEvents('unwrapped',{ // get unwrap event from ETH using blocknumber
      // filter: {id: 1},  
      fromBlock: 12207952,
      toBlock: 'latest'
  }, (error, events) => {
      if (!error){
        console.log(events);
        setUnwrapData(events);
      }
        else {
          console.log(error)
        }
  })
  };
  return (
    <div>
      <Button type="primary" onClick={refreshData}>Refresh</Button>
      {unwrapData.map((item)=>{
        return(<UnwrapItem unwrapItem={item}/>);
      })}
    </div>
  );
}

export default UnwrappingTabs;