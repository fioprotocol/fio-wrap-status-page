import React from 'react';  
import { Collapse, Card } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import "./style.css";

function WrapDetailedModal(props) {
  const { Panel } = Collapse;
  console.log(Panel);

  return (
    <Modal
      destroyOnClose
      closeIcon={false}
      visible={props.open}
      width={500}
      onOk={() => {
        props.onClose();
      }}
      onCancel={() => {
        props.onClose();
      }}
    //   footer={null}
    >
        <h2>Wrap Details</h2>
        <h4>Transaction Information</h4>
        <Card size="small" style={{ width: '100%', borderRadius:'5px' }}>
            <div className='modal_info'>
                <div className='info_title' >
                    Timestamp
                </div>
                <div className='info_text'>
                    Timestamp
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>Actor</p>
                </div>
                <div className='info_text'>
                    actor
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>Chain</p>
                </div>
                <div className='info_text'>
                    chain code
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>Amount</p>
                </div>
                <div className='info_text'>
                    amout
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>Transaction Id</p>
                </div>
                <div className='info_text'>
                    tx_id
                </div>
            </div>
        </Card>
    </Modal>
  );
}

export default WrapDetailedModal;