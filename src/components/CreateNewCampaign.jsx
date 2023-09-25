import { drizzleReactHooks } from "@drizzle/react-plugin";
import { useCallback } from "react";
import web3 from "../web3";

function CreateNewCampaign({ account, minimumToJoinCampaign }) {
  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const { send, TXObjects } = useCacheSend("CampaignFactory", "createCampaign");
  return (
    <div>
      <button
        onClick={useCallback(
          () =>
            send(web3.utils.toWei(minimumToJoinCampaign.toString(), "ether"), {
              from: account,
            }),
          [account, minimumToJoinCampaign, send]
        )}
      >
        Create new campaign
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
