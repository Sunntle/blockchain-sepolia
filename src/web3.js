import Web3 from "web3";
const web3 = new Web3(
  window.ethereum ||
    new Web3.providers.WebsocketProvider(
      process.env.NODE_ENV === "production"
        ? "wss://192.168.1.12:7545"
        : "ws://192.168.1.12:7545"
    )
);

export default web3;
