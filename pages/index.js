import {
  BrowserProvider,
  formatEther,
  InfuraProvider,
  parseEther,
} from "ethers";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [etherBalance, setEtherBalance] = useState();
  const provider = new InfuraProvider("goerli");

  const toRef = useRef();
  const amountRef = useRef();

  const getBalance = async () => {
    const balance = await provider.getBalance(currentAccount);
    return formatEther(balance);
  };

  useEffect(() => {
    // getBalance().then(setEtherBalance).catch(console.error);
    (async () => {
      try {
        currentAccount && setEtherBalance(await getBalance());
      } catch (error) {
        console.error(error);
        console.error(error.message);
      }
    })();
  }, [currentAccount]);

  const handleConnectClick = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const accountsMM = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [],
    });
    console.log("accounts: ", accounts);
    console.log("accountsMM: ", accountsMM);
    setCurrentAccount(accounts[0]);
  };

  const handleSubbmit = async (event) => {
    event.preventDefault();
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: toRef.current.value,
        value: parseEther(amountRef.current.value),
      });
      console.log("tx: ", tx);
      console.log("tx hash: ", tx.hash);
      const response = await tx.wait();
      console.log("response: ", response);
      console.log("tx finished");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Address: {currentAccount}</h1>
      <h1>balance: {etherBalance}</h1>
      <button onClick={handleConnectClick}>connect</button>
      <h1>Send</h1>
      <form onSubmit={handleSubbmit}>
        <label htmlFor="to">To</label>
        <input style={{width: "500px"}} ref={toRef} name="to" type="text" />
        <label htmlFor="amount">Amount</label>
        <input ref={amountRef} name="amount" step=".01" type="number" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Index;
