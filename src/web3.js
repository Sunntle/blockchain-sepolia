import Web3 from "web3";
const web3 = new Web3(
  window.ethereum ||
    new Web3.providers.HttpProvider(
      `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_PROJECT_ID}`
    )
);

export default web3;
