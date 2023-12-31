import CampaignFactory from "./artifacts/CampaignFactory.json";
import { Drizzle, generateStore } from "@drizzle/store";
import web3 from "./web3";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import LoadingComponent from "./components/loading";
import MainLayout from "./components/MainLayout";
import HandleError from "./components/handleError";
const options = {
  contracts: [CampaignFactory],
  web3: {
    customProvider: web3,
    fallback: {
      type: "wss",
      url: `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_PROJECT_ID}`,
    },
  },
};

const drizzleStore = generateStore(options);
//options
const drizzle = new Drizzle(options, drizzleStore);
function App() {
  return (
    <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
      <drizzleReactHooks.Initializer
        error={<HandleError />}
        loadingContractsAndAccounts="Loading accounts and contracts..."
        loadingWeb3={<LoadingComponent />}
      >
        <MainLayout />
      </drizzleReactHooks.Initializer>
    </drizzleReactHooks.DrizzleProvider>
  );
}

export default App;
