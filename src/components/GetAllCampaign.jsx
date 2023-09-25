import { drizzleReactHooks } from "@drizzle/react-plugin";

function GetAllCampaign({ connectCampaign }) {
  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const list = useCacheCall(["CampaignFactory"], (call) =>
    call("CampaignFactory", "getDeployedCampaign")
  );
  return list?.map((el, index) => (
    <p onClick={() => connectCampaign(el, index)} key={el}>
      {el}
    </p>
  ));
}

export default GetAllCampaign;
