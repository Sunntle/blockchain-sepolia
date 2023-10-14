import React, { useCallback, useEffect, useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import GetAllCampaign from "./GetAllCampaign";
import CreateNewCampaign from "./CreateNewCampaign";
import Campaign from "../artifacts/Campaign.json";
import web3 from "../web3";
import CampaignComponents from "./Campaign";
import { motion } from "framer-motion";
function MainLayout() {
  const [show, setShow] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [isCheckScreen, setIsCheckScreen] = useState(false);
  const [isShowCampaign, setIsShowCampaign] = useState(false);

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
    }else{
      const campaignSelected = drizzle.contractList?.find(el => el.address === address)
      if(campaignSelected) setCampaign(campaignSelected)
    }
  };
  const getAccount = useCallback(async ()=> {
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
  },[])

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsCheckScreen(true);
    } else {
      setIsCheckScreen(false);
    }
  },[])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return ()=>{
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize]);

  return isCheckScreen ? (
    <div className="flex flex-col gap-[10px]">
      <div className=" flex justify-end bg-white shadow-sm border-b border-gray-200 p-[10px]">
        {walletConnected ? (
          <div className="gradient text-white flex gap-[1rem] px-4 items-center py-1 rounded-lg">
            <span className="text-[0.9rem] line-clamp-1 w-[10rem] overflow-x-scroll cursor-move removeScrollBar">
              {drizzleState.accounts[0] ?? "Nothing"}
            </span>
            <div className="w-[3rem] h-[3rem] border border-white rounded-full overflow-hidden">
              <img
                src="https://i.pinimg.com/564x/4f/07/51/4f075135a220d48bdcac15b1d6f9797a.jpg"
                alt=""
              />
            </div>
          </div>
        ) : (
          <button
            onClick={getAccount}
            className="font-semibold gradient text-white py-2 px-4 rounded-lg active:scale-95 transition duration-150"
          >
            Thí chủ vui lòng kết nối ví!
          </button>
        )}
      </div>
      <div className="px-[10px] flex flex-col gap-[20px]">
        <div className="h-[20rem] rounded-lg overflow-hidden relative">
          <img
            src="https://i.pinimg.com/564x/ce/86/ea/ce86eaae3d7f3e7295ab22ad4afcc50e.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute bottom-4 left-4 bg-white shadow-sm p-[10px] rounded-lg">
            <h1 className="font-semibold">Địa chỉ trung tâm chiến dịch:</h1>
            <p>
              {walletConnected && drizzle?.contracts?.CampaignFactory.address}
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-[1.4rem] font-bold mb-[5px]">Tạo chiến dịch</h1>
          <CreateNewCampaign
            account={drizzleState.accounts[0]}
            minimumToJoinCampaign={0.001}
          />{" "}
        </div>
        <div>
          {walletConnected && (
            <GetAllCampaign
              connectCampaign={connectCampaign}
              onClick={() => setIsShowCampaign(!isShowCampaign)}
            />
          )}
          {isShowCampaign && (
            <motion.div
              className="fixed top-0 left-0 bottom-0 p-[10px] right-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className="w-[1.5rem] h-[1.5rem] absolute top-[10px] right-[10px] overflow-hidden"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsShowCampaign(!isShowCampaign)}
              >
                <img
                  src="https://cdn0.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-3/24/5003-512.png"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </motion.button>
              <div className="mt-8">
                {walletConnected && <CampaignComponents campaign={campaign} />}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      {walletConnected ? (
        <div className="text-red-500">
          <span style={{ fontWeight: "700" }}>
            {" "}
            Account: {drizzleState.accounts[0] ?? "Nothing"}
          </span>{" "}
          - Mọi tương tác đều sử dụng address này
        </div>
      ) : (
        <div>
          <p onClick={getAccount} className="text-red-500">
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
      <div className="flex my-3 gap-2">
      <CreateNewCampaign
        account={drizzleState.accounts[0]}
        minimumToJoinCampaign={0.001}
      />{" "}
      <button onClick={() => setShow(!show)} className="font-semibold gradient text-white py-2 px-4 rounded-lg active:scale-95 transition duration-150">Show list Campaign address</button>
      </div>
      {show && <GetAllCampaign connectCampaign={connectCampaign} />}
      {campaign && <CampaignComponents campaign={campaign} />}
    </div>
  );
}
export default MainLayout;
