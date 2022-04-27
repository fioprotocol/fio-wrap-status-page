import React, { useState } from "react";
import { Collapse, Tag } from "antd";
import "./style.css";
import WrapDetailedModal from "../Modal/WrapDetailedModal";

function UnwrapItem({ unwrapItem }) {
  const { Panel } = Collapse;
  const [isWrapModal, setWrapModal] = useState(false);
  const showWrapModal = () => {
    setWrapModal(true);
  };
  const hideWrapModal = () => {};
  return (
    <div>
      <WrapDetailedModal open={isWrapModal} onClose={hideWrapModal} />
      <Collapse defaultActiveKey={["1"]} bordered>
        <Panel
          header={unwrapItem.info}
          key="1"
          extra={
            <div>
              {unwrapItem.isCompleted === 1 ? (
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
            <p>{unwrapItem.transactionHash}</p>
          </div>
          <div className="panel_transaction">
            <h4>FIO Chain Transactions</h4>
            <div className="panel_FIO">
              <p>{unwrapItem.returnValues.fioaddress}</p>
              <Tag color="#525252">
                <div className="panel_tag">Sent</div>
              </Tag>
            </div>
          </div>
          <div className="panel_transaction">
            <h4>Destination Chain Transactions</h4>
            {unwrapItem.voters.map(item=>{
              return(
                <div className="panel_FIO">
                <p>{item}</p>
                <Tag color="#525252">
                  <div className="panel_tag">Wrapped</div>
                </Tag>
              </div>
              )
            })}

          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default UnwrapItem;
