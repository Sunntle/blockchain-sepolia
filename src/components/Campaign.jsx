import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import web3 from "../web3";

function CampaignComponents({ campaign }) {
  const drizzleState = drizzleReactHooks.useDrizzleState(
    (drizzleState) => drizzleState
  );
  const getMinimumcontrinbute = async () => {
    const minimum = await campaign.methods.minimumContribution().call();
    console.log(minimum);
  };
  const handleJoinCampaign = async () => {
    try {
      const result = await campaign.methods.contribute().send({
        from: drizzleState.accounts[0],
        value: web3.utils.toWei("0.002", "ether"),
        gas: web3.utils.toHex(1000000),
      });
      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };
  const handleCheckAccount = async (index) => {
    if (drizzleState.accounts[index]) {
      const approver = await campaign.methods
        .approvers(drizzleState.accounts[index])
        .call();
      console.log(approver);
    } else {
      console.log("Accounts isn't exist!");
    }
  };
  const getCountApprovers = async () => {
    const count = await campaign.methods.approversCount().call();
    console.log(count);
  };
  const getManager = async () => {
    console.log(await campaign.methods.manager().call());
  };
  const createRequest = async () => {
    try {
      await campaign.methods
        .createRequest(
          "Buy batteries",
          web3.utils.toWei("0.002", "ether"),
          "0x62B80928FDf079DD7B3fD45cC45e348Cc4A2d434"
        )
        .send({
          from: drizzleState.accounts[0],
          gas: web3.utils.toHex(1000000),
        });
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };
  const checkRequest = async (index) => {
    try {
      console.log(await campaign.methods.requests(index).call());
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };
  const handleApproveRequest = async (index) => {
    try {
      console.log(
        await campaign.methods.approveRequest(index).send({
          from: drizzleState.accounts[0],
          gas: web3.utils.toHex(1000000),
        })
      );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };
  const finalizeRequest = async (index) => {
    try {
      console.log(
        await campaign.methods.finalizeRequest(index).send({
          from: drizzleState.accounts[0],
          gas: web3.utils.toHex(1000000),
        })
      );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };
  return (
    <div>
      <h3>Kết quả đều ở console log</h3>
      <p>Đang tương tác với Campaign {campaign.address}</p>
      <p onClick={getManager}>Get manager</p>
      <p onClick={getMinimumcontrinbute}>get minimumContribution</p>
      <p onClick={handleJoinCampaign}>Join campaign</p>
      <p onClick={() => handleCheckAccount(0)}>
        Is the account joined the campaign?
      </p>
      <p onClick={getCountApprovers}>Get count approvers</p>
      <p onClick={createRequest}>Create Request</p>
      <p onClick={() => checkRequest(0)}>checkRequest</p>
      <p onClick={() => handleApproveRequest(0)}>approveRequest</p>
      <p onClick={() => finalizeRequest(0)}>finalizeRequest</p>
    </div>
  );
}

export default CampaignComponents;
