import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import GetAllCampaign from "./GetAllCampaign";
import CreateNewCampaign from "./CreateNewCampaign";
import Campaign from "../artifacts/Campaign.json";
import web3 from "../web3";
import CampaignComponents from "./Campaign";
function MainLayout() {
  const [show, setShow] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const drizzleState = drizzleReactHooks.useDrizzleState(
    (drizzleState) => drizzleState
  );
  const { drizzle } = drizzleReactHooks.useDrizzle();
  const walletConnected =
    drizzleState && drizzleState.accounts && drizzleState.accounts[0];

  const connectCampaign = (address, index) => {
    if (!drizzle.contractList.some((el) => el.address === address)) {
      const contractConfig = {
        contractName: `Campaign${index}`,
        web3Contract: new web3.eth.Contract(Campaign.abi, address),
      };
      drizzle.addContract(contractConfig);
      setCampaign(drizzle.contracts[`Campaign${index}`]);
    }
  };
  async function getAccount() {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    window.location.reload();
  }
  return (
    <div>
      {console.log(drizzleState)}
      {walletConnected ? (
        <div>
          <span style={{ fontWeight: "700" }}>
            {" "}
            Account: {drizzleState.accounts[0] ?? "Nothing"}
          </span>{" "}
          - Mọi tương tác đều sử dụng address này
        </div>
      ) : (
        <div>
          <p onClick={getAccount}>
            Please connect your wallet to access the content.
          </p>
        </div>
      )}
      <h4>
        CampaignFactory address: {drizzle?.contracts?.CampaignFactory.address}
      </h4>
      <p>
        Khi tạo 1 campaign - sẽ tự động thiết lập số tối thiểu để tham gia vào 1
        campaign là 0.001 eth
      </p>
      <CreateNewCampaign
        account={drizzleState.accounts[0]}
        minimumToJoinCampaign={0.001}
      />{" "}
      <button onClick={() => setShow(!show)}>Get all Campaign address</button>
      {show && <GetAllCampaign connectCampaign={connectCampaign} />}
      {campaign && <CampaignComponents campaign={campaign} />}
    </div>
  );
}
export default MainLayout;
