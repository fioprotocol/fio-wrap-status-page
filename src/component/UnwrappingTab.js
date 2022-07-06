import React, { useState, useEffect } from "react";

import { Button } from "antd";
import UnwrapItem from "./UnwrapItem/UnwrapItem";
import {web3, polyWeb3} from "../config/config";
import axios from "axios";
import FIOABI from "../config/ABI/FIO.json";
import POLYABI from '../config/ABI/FIOMATICNFT.json';
import contractAdd from "../config/contracts_testnet";
import BigNumber from "bignumber.js";
function UnwrappingTabs() {
  const fioContract = new web3.eth.Contract(FIOABI, contractAdd.FIO_token);
  const polyContract = new polyWeb3.eth.Contract(POLYABI, contractAdd.FIO_NFT_POLYGON);
  const [unwrapData, setUnwrapData] = useState([]);
  const fetchData = async () => {
    const oraVote = await axios({
      method: "post",
      url: "https://wrap-proxy.fioprotocol.io/fio-backend/v1/chain/get_table_rows",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      data: {
        code: "fio.oracle",
        scope: "fio.oracle",
        table: "oravotes",
        lower_bound: "0",
        limit: 20,
        json: true, 
        key_type: "i64",
        index_position: "1",
      },
    });
    const response = await axios({
      method: "get",
      url: "https://wrap-proxy.fioprotocol.io/fio-backend/blocknumber/ethereum",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", 
      },
    });
    const polyResponse = await axios({
      method: "get",
      url: "https://wrap-proxy.fioprotocol.io/fio-backend/blocknumber/polygon",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", 
      },
    });
    const blockNumber = response.data.blockNumber;
    const polyBlockNumber = polyResponse.data.blockNumber;
    const bNumber = parseInt(blockNumber, 10);
    const pNumber = parseInt(polyBlockNumber, 10);
    const events = await fioContract.getPastEvents("unwrapped", {
      fromBlock: bNumber,
      toBlock: "latest",
    });
    const polyEvent = await polyContract.getPastEvents("unwrapped", {
      fromBlock: pNumber,
      toBlock: "latest",
    });
    let polyUnwrap = [];
    if(polyEvent.length >= 0) {
      const request = polyEvent.map(async (item) => {
        const fioUnwrapData = oraVote.data.rows.find(
          (voteItem) => (voteItem.obt_id = item.transactionHash)
        );
        if (fioUnwrapData.id !== undefined) {
            // const unwrappedAmount = new BigNumber(item.returnValues.amount).dividedBy(new BigNumber(10).pow(9)).toString();
            const unwrapData = {
              chain_id: 137,
              obt_id: item.transactionHash,
              fio_address: item.returnValues.fioaddress,
              token_amount: '',
              nftname: item.returnValues.domain,
              block_number: item.blockNumber,
              fio_timestamp: fioUnwrapData.timestamp.toString(),
              iscomplete: fioUnwrapData.isComplete,
              voters: fioUnwrapData.voters,
            }
            const responseUnwrap = await axios({
              method: "post",
              url: "https://wrap-proxy.fioprotocol.io/fio-backend/setUnwrapAction",
              data: unwrapData
            });
            polyUnwrap.push(unwrapData);
          // }
        }
        setUnwrapData(polyUnwrap);
      });
    }
    if (events.length >= 0) {
      let unwrap = unwrapData;
      const request = events.map(async (item) => {
        const fioUnwrapData = oraVote.data.rows.find(
          (voteItem) => (voteItem.obt_id = item.transactionHash)
        );
        if (fioUnwrapData.id !== undefined) {
            const unwrappedAmount = new BigNumber(item.returnValues.amount).dividedBy(new BigNumber(10).pow(9)).toString();
            const unwrapData = {
              chain_id: 1,
              obt_id: item.transactionHash,
              fio_address: item.returnValues.fioaddress,
              token_amount: unwrappedAmount,
              nftname: '',
              block_number: item.blockNumber,
              fio_timestamp: fioUnwrapData.timestamp.toString(),
              iscomplete: fioUnwrapData.isComplete,
              voters: fioUnwrapData.voters,
            }
            const responseUnwrap = await axios({
              method: "post",
              url: "https://wrap-proxy.fioprotocol.io/fio-backend/setUnwrapAction",
              data: unwrapData
            });

            unwrap.push(unwrapData);
          // }
        }
      });
      const response = await axios({
        method: "get",
        url: "https://wrap-proxy.fioprotocol.io/fio-backend/getUnwrapActionByComplete",
      });
      response.data.map((item)=>{
        unwrap.push(item);
      })
      return Promise.all(request).then(() => {
        setUnwrapData(unwrap);
      });
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <div>
      <Button type="primary" onClick={refreshData}>
        Refresh
      </Button>
      {unwrapData.map((item) => {
        return <UnwrapItem unwrapItem={item} />;
      })}
    </div>
  );
}

export default UnwrappingTabs;
