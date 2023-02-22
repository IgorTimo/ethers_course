const connectMetaMask = async () => {
  if (!window?.ethereum) {
    throw new Error("No MM in this browser!");
  }
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [],
  });
  return accounts[0];
};

export default connectMetaMask;
