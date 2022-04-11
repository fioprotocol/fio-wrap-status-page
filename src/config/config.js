import { INFURA_URL } from "./config-testnet";
import Web3 from "web3";

let web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL))
export default web3;
