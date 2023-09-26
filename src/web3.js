import Web3 from "web3";

const web3 = new Web3(
  window.ethereum ||
    new Web3.providers.WebsocketProvider(
      process.env.NODE_ENV === "production"
        ? `wss://mainnet.infura.io/ws/v3/${process.env.PROJECT_ID}`
        : "ws://127.0.0.1:7545"
    )
);

export default web3;
