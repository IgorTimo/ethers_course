import walletProvider from "../walletProvider";
import primitives from "./primitives";

const getPrimitivesWithSigner = async () => {
    const signer = await walletProvider.getSigner();
    const primitivesWithSigner = primitives.connect(signer);
    //   const primitivesWithSigner = new Contract(address, abi, signer);
    return primitivesWithSigner;
  };

  export default getPrimitivesWithSigner;
