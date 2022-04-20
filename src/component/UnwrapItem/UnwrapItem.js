import React, { useState } from 'react';
import { Collapse, Tag } from 'antd';
import "./style.css";
import WrapDetailedModal from '../Modal/WrapDetailedModal';

function UnwrapItem({unwrapItem}) {
  const { Panel } = Collapse;
  const [isWrapModal, setWrapModal] = useState(false);
  const showWrapModal = () => {
    setWrapModal(true);
  }
  const hideWrapModal = () => {
     
  }
  return (
    <div>
        <WrapDetailedModal open={isWrapModal} onClose={hideWrapModal}/>
        <Collapse defaultActiveKey={['1']} bordered> 
            <Panel header="Timestamp:<00/00/0000 @ 00:00 AM>   Actor:<Actor> Chain:<chain> Amount: <amount>" key="1" extra={
                <div>
                    <Tag color="#108ee9"><div className='panel_tag'>Completed</div></Tag>
                </div>
            }>
              <div className='panel_transaction' onClick={showWrapModal}>
                <h4>Transaction ID</h4>
                <p>{unwrapItem.transactionHash}</p>
              </div>
              <div className='panel_transaction'>
                <h4>FIO Chain Transactions</h4> 
                <div className='panel_FIO'>
                  <p>{unwrapItem.returnValues.fioaddress}</p>
                  <Tag color="#525252"><div className='panel_tag'>Sent</div></Tag>
                </div>
              </div>
              <div className='panel_transaction'>
                <h4>Destination Chain Transactions</h4>
                <div className='panel_FIO'>
                  <p>bp1@cryptohandle</p>
                  <Tag color="#525252"><div className='panel_tag'>Wrapped</div></Tag>
                </div>
                <div className='panel_FIO'>
                  <p>bp2@cryptohandle</p>
                  <Tag color="#525252"><div className='panel_tag'>Wrapped</div></Tag>
                </div>
                <div className='panel_FIO'>
                  <p>bp3@cryptohandle</p>
                  <Tag color="#525252"><div className='panel_tag'>Wrapped</div></Tag>
                </div>
              </div>
            </Panel>
        </Collapse>
    </div>
  );
}

export default UnwrapItem;