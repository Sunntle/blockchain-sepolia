import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import web3 from "../web3";
import { motion } from "framer-motion";

function CampaignComponents({ campaign }) {
  const [isShow, setIsShow] = React.useState(null);

  const [isManager, setIsManager] = React.useState(null);
  const [isMinimumContribution, setIsMinimumContribution] =
    React.useState(null);
  const [isJoinCampaign, setIsJoinCampaign] = React.useState(null);
  const [isApproveRequest, setIsApproveRequest] = React.useState(null);
  const [isCountApprovers, setIsCountApprovers] = React.useState(null);

  const drizzleState = drizzleReactHooks.useDrizzleState(
    (drizzleState) => drizzleState
  );

  const getMinimumcontrinbute = async () => {
    const minimum = await campaign.methods.minimumContribution().call();
    setIsMinimumContribution(minimum);
  };

  const getManager = async () => {
    const res = await campaign.methods.manager().call();
    setIsManager(res);
  };

  const handleJoinCampaign = async () => {
    try {
      const result = await campaign.methods.contribute().send({
        from: drizzleState.accounts[0],
        value: web3.utils.toWei("0.002", "ether"),
        gas: web3.utils.toHex(1000000),
      });
      console.log("Transaction result:", result);
      setIsJoinCampaign(result);
      alert("Join campaign successfully!");
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  const handleCheckAccount = async (index) => {
    if (drizzleState.accounts[index]) {
      const approver = await campaign.methods
        .approvers(drizzleState.accounts[index])
        .call();
      setIsApproveRequest(approver);
    } else {
      console.log("Accounts isn't exist!");
    }
  };
  const getCountApprovers = async () => {
    const count = await campaign.methods.approversCount().call();
    console.log(count);
    setIsCountApprovers(count);
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
    <div className="flex flex-col gap-[10px] items-start">
      <div className="shadow-sm bg-[#e0e0e0] p-[10px] text-[#3a3a3a] rounded-lg font-semibold">
        Đang tương tác với Campaign {campaign.address}
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsShow("manager");
          getManager();
        }}
        className={
          "px-6 py-2 mt-2 rounded-lg gradient font-semibold text-white w-full"
        }
      >
        Get manager
      </motion.button>
      {isShow === "manager" && (
        <div className="shadow-sm bg-[#e0e0e0] w-full p-[10px] text-[#3a3a3a] rounded-lg font-semibold">
          {isManager ? isManager : "Loading..."}
        </div>
      )}
      <motion.button
        onClick={() => {
          getMinimumcontrinbute();
          setIsShow("minimumContribution");
        }}
        whileTap={{ scale: 0.95 }}
        className={
          "px-6 py-2 mt-2 rounded-lg gradient font-semibold text-white w-full"
        }
      >
        get minimumContribution
      </motion.button>
      {isShow === "minimumContribution" && (
        <div className="shadow-sm bg-[#e0e0e0] p-[10px] text-[#3a3a3a] w-full rounded-lg font-semibold">
          {isMinimumContribution ? isMinimumContribution : "Loading..."}
        </div>
      )}

      <motion.button
        onClick={() => {
          handleJoinCampaign();
          setIsShow("joinCampaign");
        }}
        whileTap={{ scale: 0.95 }}
        className={
          "px-6 py-2 mt-2 rounded-lg gradient font-semibold text-white w-full"
        }
      >
        Join campaign
      </motion.button>
      {isShow === "joinCampaign" && (
        <div className="shadow-sm bg-[#e0e0e0] p-[10px] text-[#3a3a3a] w-full rounded-lg font-semibold">
          {isJoinCampaign ? isJoinCampaign : "Loading..."}
        </div>
      )}

      <motion.button
        onClick={() => {
          handleCheckAccount(0);
          setIsShow("checkAccount");
        }}
        whileTap={{ scale: 0.95 }}
        className={
          "px-6 py-2 mt-2 rounded-lg gradient font-semibold text-white w-full"
        }
      >
        Is the account joined the campaign?
      </motion.button>
      {isShow === "checkAccount" && (
        <div className="shadow-sm bg-[#e0e0e0] p-[10px] text-[#3a3a3a] w-full rounded-lg font-semibold">
          {isApproveRequest
            ? "The account joined the campaign"
            : "The account did not join the campaign"}
        </div>
      )}

      <motion.button
        onClick={() => {
          getCountApprovers();
          setIsShow("countApprovers");
        }}
        whileTap={{ scale: 0.95 }}
        className={
          "px-6 py-2 mt-2 rounded-lg gradient font-semibold text-white w-full"
        }
      >
        Get count approvers
      </motion.button>
      {isShow === "countApprovers" && (
        <div className="shadow-sm bg-[#e0e0e0] p-[10px] text-[#3a3a3a] w-full rounded-lg font-semibold">
          {isCountApprovers ? isCountApprovers : "Loading..."}
        </div>
      )}

      <motion.button onClick={createRequest}>Create Request</motion.button>
      <motion.button onClick={() => checkRequest(0)}>
        checkRequest
      </motion.button>
      <motion.button onClick={() => handleApproveRequest(0)}>
        approveRequest
      </motion.button>
      <motion.button onClick={() => finalizeRequest(0)}>
        finalizeRequest
      </motion.button>
    </div>
  );
}

export default CampaignComponents;
