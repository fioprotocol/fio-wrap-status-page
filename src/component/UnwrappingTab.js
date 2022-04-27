import React, { useState, useEffect } from "react";
import moment from "moment";

import { Button } from "antd";
import UnwrapItem from "./UnwrapItem/UnwrapItem";
import web3 from "../config/config";
import axios from "axios";
import { BACK_URL } from "../config/config-testnet";
import FIOABI from "../config/ABI/FIO.json";
import contractAdd from "../config/contracts_testnet";
function UnwrappingTabs() {
  const fioContract = new web3.eth.Contract(FIOABI, contractAdd.FIO_token);
  const [unwrapData, setUnwrapData] = useState([]);
  const fetchData = async () => {
    const oraVote = await axios({
      method: "post",
      url: "http://localhost:8008/fio-backend/v1/chain/get_table_rows",
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
      url: "http://localhost:8008/fio-backend/blocknumber/ethereum",
    });
    const blockNumber = response.data.blockNumber;
    const bNumber = parseInt(blockNumber, 10);
    const events = await fioContract.getPastEvents("unwrapped", {
      fromBlock: bNumber,
      toBlock: "latest",
    });

    if (events.length > 0) {
      let unwrap = [];
      const request = events.map(async (item) => {
        const fioUnwrapData = oraVote.data.rows.find(
          (voteItem) => (voteItem.obt_id = item.transactionHash)
        );
        if (fioUnwrapData.id !== undefined) {
          var timestamp = await web3.eth.getBlock(item.blockNumber);

          console.log("timestamp: ", timestamp.timestamp);
          var date = new Date(+timestamp.timestamp * 1000);
          var dateString = moment(date).format("YYYY/MM/DD HH:mm");
          const info =
            "Timestamp: " +
            dateString +
            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
            "Actor:" +
            "fio@faucet" +
            "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
            "Chain:" +
            "Ethereum";
          const data = {
            ...item,
            isCompleted: fioUnwrapData.isComplete,
            voters: fioUnwrapData.voters,
            info: info,
          };
          unwrap.push(data);
        }
      });

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
