import walletProvider from "../walletProvider";
import strangeFactory from "./strangeFactory";


const getStrangeFactoryWithSigner = async () => {
  const signer = await walletProvider.getSigner();
  return strangeFactory.connect(signer);
};

export default getStrangeFactoryWithSigner;
