import CampaignFactory from "./artifacts/CampaignFactory.json";
import { Drizzle, generateStore } from "@drizzle/store";
import web3 from "./web3";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import LoadingComponent from "./components/loading";
import MainLayout from "./components/MainLayout";
const options = {
  contracts: [CampaignFactory],
  web3: {
    customProvider: web3,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
function App() {
  return (
    <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
      <drizzleReactHooks.Initializer
        error="There was an error."
        loadingContractsAndAccounts="Also still loading."
        loadingWeb3={<LoadingComponent />}
      >
        <MainLayout />
      </drizzleReactHooks.Initializer>
    </drizzleReactHooks.DrizzleProvider>
  );
}

export default App;
