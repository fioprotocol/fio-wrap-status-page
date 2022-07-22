import Web3 from "web3";

const config = {
  port: process.env.REACT_APP_PORT,
  portMonitor: 15,
  web3Provider: "",
  unsubscribeLandingPage: "",
  startBlock: 0,
  stepSize: 10,
  waitingTime: 15,
  polyWeb3: new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_POLYGON_URL)
  ),
  web3: new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URL)
  ),
};

export default config;
