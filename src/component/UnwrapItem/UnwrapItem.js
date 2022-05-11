import React, { useEffect, useState } from "react";
import { Collapse, Tag } from "antd";
import "./style.css";
import WrapDetailedModal from "../Modal/WrapDetailedModal";
import web3 from "../../config/config";
import moment from "moment";

function UnwrapItem({ unwrapItem }) {
  const { Panel } = Collapse;
  const [isWrapModal, setWrapModal] = useState(false);
  const [infoText, setInfoText] = useState("");
  const showWrapModal = () => {
    setWrapModal(true);
  };
  const hideWrapModal = () => {};
  const getUnwrapInfo = async () => {
    var timestamp = await web3.eth.getBlock(unwrapItem.block_number);
    var date = new Date(+timestamp.timestamp * 1000);
    var dateString = moment(date).format("YYYY/MM/DD HH:mm");
    const info =
      "Timestamp: " +
      dateString +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      "Actor:" +
      unwrapItem.fio_address +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      "Chain:" +
      "Ethereum";
    setInfoText(info);
  };
  useEffect(async () => {
    await getUnwrapInfo();
  }, []);
  return (
    <div>
      <WrapDetailedModal open={isWrapModal} onClose={hideWrapModal} />
      <Collapse defaultActiveKey={["1"]} bordered>
        <Panel
          header={infoText}
          key="1"
          extra={
            <div>
              {unwrapItem.iscomplete === 1 ? (
                <Tag color="#108ee9">
                  <div className="panel_tag">Completed</div>
                </Tag>
              ) : (
                <Tag color="#F82AA9">
                  <div className="panel_tag">Pending</div>
                </Tag>
              )}
            </div>
          }
        >
          <div className="panel_transaction" onClick={showWrapModal}>
            <h4>Transaction ID</h4>
            <p>{unwrapItem.obt_id}</p>
          </div>
          <div className="panel_transaction">
            <h4>FIO Chain Transactions</h4>
            <div className="panel_FIO">
              <p>{unwrapItem.fio_address}</p>
              <Tag color="#525252">
                <div className="panel_tag">Sent</div>
              </Tag>
            </div>
          </div>
          <div className="panel_transaction">
            <h4>Destination Chain Transactions</h4>
            {unwrapItem.voters.map((item) => {
              return (
                <div className="panel_FIO">
                  <p>{item}</p>
                  <Tag color="#525252">
                    <div className="panel_tag">unwrapped</div>
                  </Tag>
                </div>
              );
            })}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default UnwrapItem;
