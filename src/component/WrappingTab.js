import React from 'react';
import { Collapse } from 'antd';
import DetailedItem from './DetailedItem/DetailedItem';
import { useSelector } from "react-redux";
function WrappingTabs() {
  const { Panel } = Collapse;
  const connectedAddress = useSelector((state) => state.fio.balance);
  console.log(connectedAddress);
  return (
    <div>
      <DetailedItem />
      <DetailedItem />
    </div>
  );
}

export default WrappingTabs;
