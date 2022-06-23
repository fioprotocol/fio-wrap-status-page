import { INFURA_URL, POLYGON_URL } from "./config-testnet";
import Web3 from "web3";

export const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
export const polyWeb3 = new Web3(new Web3.providers.HttpProvider(POLYGON_URL));
