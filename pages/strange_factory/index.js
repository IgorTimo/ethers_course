import { Typed } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import getStrangeFactoryWithSigner from "../../abi/strange_factory/getReferenceTypesWithSigner";
import strangeFactory from "../../abi/strange_factory/strangeFactory";
import Layout from "../../components/Layout";

const StrangeFactory = () => {
  const [titledContracts, setTitledContracts] = useState([]);
  const [currentTitledContractsLoaded, setCurrentTitledContractsLoaded] =
    useState(0);
  const [isAllLoaded, setAllLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const stringRef = useRef();
  const numberRef = useRef();
  const router = useRouter();

  const WANT_TO_LOAD = 5;

  useEffect(() => {
    (async () => {
      try {
        for (
          let i = currentTitledContractsLoaded;
          i < currentTitledContractsLoaded + WANT_TO_LOAD;
          i++
        ) {
          const titled = await strangeFactory.titledContracts(i);
          setTitledContracts((prev) => [...prev, titled]);
        }
      } catch (error) {
        console.error(error);
        setAllLoaded(true);
      }
    })();
  }, [currentTitledContractsLoaded]);

  const handleAddUntitledContractClik = async () => {
    try {
      const strangeFactoryWithSigner = await getStrangeFactoryWithSigner();
      const tx = await strangeFactoryWithSigner.add();
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddStringContractSubmit = async (event) => {
    event.preventDefault();
    try {
      const strangeFactoryWithSigner = await getStrangeFactoryWithSigner();
      const tx = await strangeFactoryWithSigner["add(string)"](
        stringRef.current.value
      );
      console.log("tx: ", tx);
      // strangeFactoryWithSigner.on("ContractCreation", (result) => {console.log("on event: ", result)});
      // strangeFactoryWithSigner.on("*", (result) => {console.log("on all event: ", result)});
      strangeFactoryWithSigner.once("ContractCreation", (address) => {
        router.push({
          pathname: "/strange_factory/titled",
          query: { address },
        });
      });
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNumberContractSubmit = async (event) => {
    event.preventDefault();
    try {
      const strangeFactoryWithSigner = await getStrangeFactoryWithSigner();
      const tx = await strangeFactoryWithSigner.add(
        Typed.uint256(numberRef.current.value)
      );

      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveLastClick = async () => {
    setErrorMessage("");
    try {
      const price = await strangeFactory.priceOfRemoving();
      const tx = await (await getStrangeFactoryWithSigner()).removeLast({value: price, gasLimit: 10n ** 10n});
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
      console.log(Object.entries(error));
      setErrorMessage(error.reason);
    }
  };

  handleRemoveLastClick;

  return (
    <Layout>
      <h4>List of current titled:</h4>
      <ol>
        {titledContracts.map((titledContract, index) => (
          <li key={index}>
            <Link
              href={{
                pathname: "/strange_factory/titled",
                query: { address: titledContract },
              }}
            >
              {titledContract}
            </Link>
          </li>
        ))}
      </ol>
      {!isAllLoaded && (
        <button
          onClick={() => {
            setCurrentTitledContractsLoaded(
              currentTitledContractsLoaded + WANT_TO_LOAD
            );
          }}
        >
          Load {WANT_TO_LOAD} more
        </button>
      )}
      <h3>Add more contracts</h3>
      <button onClick={handleAddUntitledContractClik}>
        Add untitled contract
      </button>
      <form onSubmit={handleAddStringContractSubmit}>
        <label htmlFor="name">Contract title</label>
        <input ref={stringRef} name="name" type="text" />
        <button>Create</button>
      </form>
      <form onSubmit={handleAddNumberContractSubmit}>
        <label htmlFor="number">Contract number</label>
        <input ref={numberRef} name="number" type="number" step={1} min={0} />
        <button>Create</button>
      </form>
      <button onClick={handleRemoveLastClick}>Remove last</button>
      <br />
      <span>{errorMessage}</span>
    </Layout>
  );
};

export default StrangeFactory;
