import { InfuraProvider } from "ethers";

const defaultProvider = new InfuraProvider(process.env.networkName);

export default defaultProvider;
