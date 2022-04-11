import conf_testnet from "./config-testnet";
import {INFURA_URL} from '../config/config-testnet';
import Web3 from "web3";

let config = conf_testnet;
let web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL))

console.log(web3);
export default {
  ...config,
  web3,
};
