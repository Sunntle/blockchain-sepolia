import { drizzleReactHooks } from "@drizzle/react-plugin";
import { useCallback } from "react";
import web3 from "../web3";

function CreateNewCampaign({ account, minimumToJoinCampaign }) {
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const { send, TXObjects } = useCacheSend("CampaignFactory", "createCampaign");
  return (
    <div>
      <button
        className="font-semibold gradient text-white py-2 px-4 rounded-lg active:scale-95 transition duration-150"
        onClick={useCallback(
          () =>
            send(web3.utils.toWei(minimumToJoinCampaign.toString(), "ether"), {
              from: account,
            }),
          [account, minimumToJoinCampaign, send]
        )}
      >
        Create campaign with 0.001ETH
      </button>
      {TXObjects.length > 0 &&
        TXObjects.map(
          (el, index) =>
            el && (
              <p key={index}>
                {el.status === "error" ? (
                  <span>
                    {el.status}: {el.error.message}
                  </span>
                ) : (
                  el.status
                )}
              </p>
            )
        )}
    </div>
  );
}

export default CreateNewCampaign;
