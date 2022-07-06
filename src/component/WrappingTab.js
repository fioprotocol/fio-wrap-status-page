import React from 'react';
import { Collapse } from 'antd';
import DetailedItem from './DetailedItem/DetailedItem';
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "antd";

function WrappingTabs() {
  const { Panel } = Collapse;
  const connectedAddress = useSelector((state) => state.fio.balance);
  const fetchLatestActions = async (lastNumber) => {
    var offset=-10;
    var latestActions = await axios({
      method: "post",
      url: "https://wrap-proxy.fioprotocol.io/fio-backend/v1/history/get_actions",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        account_name: "fio.oracle",
        pos: -1,
        offset: offset,
      },
    });
    while(latestActions.data.actions.length > 0 && latestActions.data.actions[0].block_num > lastNumber) {
        offset -= 10;
        latestActions = await axios({
          method: "post",
          url: "https://wrap-proxy.fioprotocol.io/fio-backend/v1/history/get_actions",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: {
            account_name: "fio.oracle",
            pos: -1,
            offset: offset,
          },
      });
    }
    return latestActions.data.actions;
  }
  const fetchData = async () => {

    const fioResponse = await axios({
      method: "get",
      url: "https://wrap-proxy.fioprotocol.io/fio-backend/blocknumber/fio",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", 
      },
    });
    const fioBlockNumber = parseFloat(fioResponse.data.blockNumber, 1);
    const latestActions = await fetchLatestActions(fioBlockNumber);
  };
  const refreshData = async () => {
    await fetchData();
  };
  return (
    <div>
      <Button type="primary" onClick={refreshData}>
        Refresh
      </Button>
      {/* <DetailedItem />
      <DetailedItem /> */}
    </div>
  );
}

export default WrappingTabs;
