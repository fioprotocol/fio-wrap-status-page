import React, { useEffect, useState } from 'react';  
import { Collapse, Card } from 'antd';
import Modal from 'react-modal';
import {web3, polyWeb3} from "../../config/config";
import "./style.css";
import moment from "moment";

function WrapDetailedModal({ open, onClose, detailItem}) {
  const { Panel } = Collapse;
    console.log(detailItem);
    const [timeStamp, setTimeStamp] = useState('');
    const nftTitle = detailItem !== undefined ?(detailItem.nftname !== ''?'Domain':'Amount'):'Amount';
    const nftDomain = detailItem !== undefined ?(detailItem.nftname !== ''?detailItem.nftname :detailItem.token_amount):'0';
    const getTimeStamp = async()=>{
        let timestamp;
        if(detailItem.chain_id === 1) {
          timestamp = await web3.eth.getBlock(detailItem.block_number);
        } else if(detailItem.chain_id === 137) {
          timestamp = await polyWeb3.eth.getBlock(detailItem.block_number);
        }
        var date = new Date(+timestamp.timestamp * 1000);
        var dateString = moment(date).format("YYYY/MM/DD HH:mm");
        console.log(dateString.toString());
        return dateString.toString();
    }
    useEffect(async () => {
        const time = await getTimeStamp();
        setTimeStamp(time);
      }, []);
  return (
    <Modal
    isOpen={open}
    onRequestClose={onClose}
    >
        <h2>Wrap Details</h2>
        <h4>Transaction Information</h4>
        <Card size="small" style={{ width: '100%', borderRadius:'5px' }}>
            <div className='modal_info'>
                <div className='info_title' >
                    Timestamp
                </div>
                <div className='info_text'>
                    {timeStamp}
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>Actor</p>
                </div>
                <div className='info_text'>
                {detailItem !== undefined? detailItem.fio_address:''}
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>Chain</p>
                </div>
                <div className='info_text'>
                    {detailItem !== undefined? detailItem.chain_id:''}
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>{nftTitle}</p>
                </div>
                <div className='info_text'>
                    {nftDomain}
                </div>
            </div>
        </Card>
        <Card size="small" style={{ width: '100%', borderRadius:'5px'}}>
            <div className='modal_info'>
                <div style={{width:'40%'}} >
                    <p>Transaction Id</p>
                </div>
                <div className='info_text'>
                {detailItem !== undefined? detailItem.obt_id:''}
                </div>
            </div>
        </Card>
    </Modal>
  );
}

export { WrapDetailedModal };