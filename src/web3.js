import Web3 from "web3";
const web3 = new Web3(
  window.ethereum ||
    new Web3.providers.HttpProvider(
      `https://sepolia.infura.io/v3/${process.env.REACT_APP_PROJECT_ID}`
    )
);

export default web3;
