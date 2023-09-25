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
  return (
    <div>
      <div>
        <span style={{ fontWeight: "700" }}>
          {" "}
          Account: {drizzleState.accounts[0] ?? "Nothing"}
        </span>{" "}
        - Mọi tương tác đều sử dụng address này
      </div>
      <h4>
        CampaignFactory address: {drizzle?.contracts?.CampaignFactory.address}
      </h4>
      <CreateNewCampaign
        account={drizzleState.accounts[0]}
        minimumToJoinCampaign={0.001}
      />
      <button onClick={() => setShow(!show)}>Get all Campaign address</button>
      {show && <GetAllCampaign connectCampaign={connectCampaign} />}
      {campaign && <CampaignComponents campaign={campaign} />}
    </div>
  );
}
export default MainLayout;
