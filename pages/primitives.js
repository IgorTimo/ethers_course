import { hexlify } from "ethers";
import { useEffect, useRef, useState } from "react";
import getPrimitivesWithSigner from "../abi/primitives/getPrimitivesWithSigner";
import primitives from "../abi/primitives/primitives";
import Layout from "../components/Layout";
import { useAppContext } from "../hooks/useAppContext";

const Primitives = () => {
  const [isTrue, setTrue] = useState();
  const [smallUint, setSmallUint] = useState();
  const [bigUint, setBigUint] = useState(0n);
  const [smallNumberValue, setSmallNumberValue] = useState(0);
  const [smallBytes, setSmallBytes] = useState("");
  const [bigBytes, setBigBytes] = useState("");
  const [wallet, setWallet] = useState("");
  const [name, setName] = useState("");

  //   const smallUintRef = useRef();
  const bigUintRef = useRef();
  const smallBytesRef = useRef();
  const bigBytesRef = useRef();
  const walletsRef = useRef();
  const nameRef = useRef();
  const { contextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;

  console.log("currentAccount: ", currentAccount);

  useEffect(() => {
    (async () => {
      try {
        const isTrue = await primitives.isTrue();
        console.log("is true: ", isTrue);
        setTrue(isTrue);
        const smallUint = await primitives.smallUint();
        console.log("smallUint: ", smallUint);
        console.log("smallUint type: ", typeof smallUint);
        setSmallUint(smallUint);
        const bigUint = await primitives.bigUint();
        console.log("bigUint: ", bigUint);
        console.log("bigUint type: ", typeof bigUint);
        setBigUint(bigUint);
        const smallBytes = await primitives.smallBytes();
        console.log("smallBytes: ", smallBytes);
        console.log("smallBytes type: ", typeof smallBytes);
        setSmallBytes(smallBytes);
        const bigBytes = await primitives.bigBytes();
        console.log("bigBytes: ", bigBytes);
        console.log("bigBytes type: ", typeof bigBytes);
        setBigBytes(bigBytes);
        const wallet = await primitives.wallet();
        console.log("wallet: ", wallet);
        console.log("wallet type: ", typeof wallet);
        setWallet(wallet);
        const name = await primitives.name();
        console.log("name: ", name);
        console.log("name type: ", typeof name);
        setName(name);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSetTrue = async (isTrue) => {
    try {
      const primitivesWithSigner = await getPrimitivesWithSigner();
      const tx = await primitivesWithSigner.setTrue(isTrue);
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetSmallUintSubmmit = async (event) => {
    event.preventDefault();
    try {
      const primitivesWithSigner = await getPrimitivesWithSigner();
      const tx = await primitivesWithSigner.setSmallUint(
        BigInt(smallNumberValue)
      );
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetBigUintSubmmit = async (event) => {
    event.preventDefault();

    try {
      const primitivesWithSigner = await getPrimitivesWithSigner();
      const tx = await primitivesWithSigner.setBiglUint(
        BigInt(bigUintRef.current.value)
      );
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetSmallBytesSubmmit = async (event) => {
    event.preventDefault();
    const utf8Encode = new TextEncoder();
    const arr = utf8Encode.encode(smallBytesRef.current.value);
    console.log("arr: ", arr);
    const bytes = hexlify(arr);
    console.log("bytes: ", bytes);
    try {
      const primitivesWithSigner = await getPrimitivesWithSigner();
      const tx = await primitivesWithSigner.setSmallBytes(bytes);
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetBigBytesSubmmit = async (event) => {
    event.preventDefault();
    const utf8Encode = new TextEncoder();
    const arr = utf8Encode.encode(bigBytesRef.current.value);
    console.log("arr: ", arr);
    const bytes = hexlify(arr);
    console.log("bytes: ", bytes);
    try {
      const primitivesWithSigner = await getPrimitivesWithSigner();
      const tx = await primitivesWithSigner.setBigBytes(bytes);
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetWalletSubmmit = async (event) => {
    event.preventDefault();
    await setWalletHelper(walletsRef.current.value);
  };

  const handleSetMyWalletClick = async () => {
    await setWalletHelper(currentAccount);
  };

  const setWalletHelper = async (wallet) => {
    try {
      const primitivesWithSigner = await getPrimitivesWithSigner();
      const tx = await primitivesWithSigner.setWallet(wallet);
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetNameSubmmit = async (event) => {
    event.preventDefault();
    try {
      const primitivesWithSigner = await getPrimitivesWithSigner();
      const tx = await primitivesWithSigner.setName(nameRef.current.value);
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1>Primitives</h1>
      <h3>Bool: {isTrue ? "true" : "false"}</h3>
      <button onClick={() => handleSetTrue(true)}>Set true</button>
      <button onClick={() => handleSetTrue(false)}>Set false</button>
      {smallUint != undefined && <h3>Small uint: {smallUint.toString()}</h3>}
      <form onSubmit={handleSetSmallUintSubmmit}>
        <label htmlFor="smallUint">New small uint:</label>
        <input
          style={{ width: "500px" }}
          name="smallUint"
          //   ref={smallUintRef}
          onChange={(event) => setSmallNumberValue(event.target.value)}
          value={smallNumberValue}
          type="number"
          min={0}
          max={255}
        />
        <button disabled={smallNumberValue > 255}>Set new uint</button>
      </form>
      <h3>Big uint: {bigUint.toString()}</h3>
      <form onSubmit={handleSetBigUintSubmmit}>
        <label htmlFor="bigUint">New small uint:</label>
        <input
          style={{ width: "500px" }}
          name="bigUint"
          ref={bigUintRef}
          type="text"
        />
        <button>Set new uint</button>
      </form>
      <h3>Small bytes: {smallBytes}</h3>
      <form onSubmit={handleSetSmallBytesSubmmit}>
        <label htmlFor="smallBytes">New small bytes:</label>
        <input
          style={{ width: "500px" }}
          name="smallBytes"
          ref={smallBytesRef}
          type="text"
        />
        <button>Set new bytes</button>
      </form>
      <h3>Big bytes: {bigBytes}</h3>
      <form onSubmit={handleSetBigBytesSubmmit}>
        <label htmlFor="bigBytes">New big bytes:</label>
        <input
          style={{ width: "500px" }}
          name="bigBytes"
          ref={bigBytesRef}
          type="text"
        />
        <button>Set new bytes</button>
      </form>
      <h3>Wallet: {wallet}</h3>
      <form onSubmit={handleSetWalletSubmmit}>
        <label htmlFor="wallet">New Wallet:</label>
        <input
          style={{ width: "500px" }}
          name="wallet"
          ref={walletsRef}
          type="text"
        />
        <button>Set new Wallet</button>
        {currentAccount && (
          <button type="button" onClick={handleSetMyWalletClick}>
            Set my Wallet
          </button>
        )}
      </form>
      <h3>Name: {name}</h3>
      <form onSubmit={handleSetNameSubmmit}>
        <label htmlFor="name">New name:</label>
        <input
          style={{ width: "500px" }}
          name="name"
          ref={nameRef}
          type="text"
        />
        <button>Set new name</button>
      </form>
    </Layout>
  );
};

export default Primitives;
