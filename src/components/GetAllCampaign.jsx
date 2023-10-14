import { drizzleReactHooks } from "@drizzle/react-plugin";

function GetAllCampaign({ connectCampaign, onClick }) {
  const { useCacheCall } = drizzleReactHooks.useDrizzle();
  const list = useCacheCall(["CampaignFactory"], (call) =>
    call("CampaignFactory", "getDeployedCampaign")
  );
  return list?.map((el, index) => (
    <div
      onClick={() => {
        connectCampaign(el, index);
        onClick && onClick();
      }}
      key={el}
      className="flex lg:inline-flex lg:w-5/12 mx-2 cursor-pointer hover:opacity-25 duration-150 gap-[10px] shadow-sm py-2 px-2 items-center mb-[10px] rounded-lg bg-[#e0e0e0]"
    >
      <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden">
        <img
          src="https://i.pinimg.com/564x/51/66/ac/5166ac1fa7311dfcfdd3e8197c795b4e.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <p className="max-w-[20rem] removeScrollBar overflow-x-scroll">{el}</p>
    </div>
  ));
}

export default GetAllCampaign;
