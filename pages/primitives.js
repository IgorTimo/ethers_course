import { useEffect, useRef, useState } from "react";
import getPrimitivesWithSigner from "../abi/primitives/getPrimitivesWithSigner";
import primitives from "../abi/primitives/primitives";
import Layout from "../components/Layout";

const Primitives = () => {
  const [isTrue, setTrue] = useState();
  const [smallUint, setSmallUint] = useState();
  const [bigUint, setBigUint] = useState(0n);
  const [smallNumberValue, setSmallNumberValue] = useState(0);

  //   const smallUintRef = useRef();
  const bigUintRef = useRef();


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
    </Layout>
  );
};

export default Primitives;
