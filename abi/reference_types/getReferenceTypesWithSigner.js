import walletProvider from "../walletProvider";
import referenceTypes from "./referenceTypes";

const getReferenceTypesWithSigner = async () => {
  const signer = await walletProvider.getSigner();
  return referenceTypes.connect(signer);
};

export default getReferenceTypesWithSigner;
