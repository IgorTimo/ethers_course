import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import getReferenceTypesWithSigner from "../abi/reference_types/getReferenceTypesWithSigner";
import referenceTypes from "../abi/reference_types/referenceTypes";
import Layout from "../components/Layout";

const ReferenceTypes = () => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentOrder, setCurrentOrder] = useState(0n);
  const [prices, setPrices] = useState([]);
  const [names, setNames] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const nameRef = useRef();
  const priceRef = useRef();
  const isAvaliableRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const currentProduct = await referenceTypes.currentProduct();
        console.log("currentProduct: ", currentProduct);
        setCurrentProduct(currentProduct);
        const currentOrder = await referenceTypes.currentOrder();
        console.log("currentProduct: ", currentOrder);
        setCurrentOrder(currentOrder);
        const prices = await referenceTypes.getPrices();
        console.log("prices: ", prices);
        console.log("prices type: ", typeof prices);
        setPrices(prices);
        const names = await referenceTypes.getNames();
        console.log("names: ", names);
        setNames(names);

        // const firstPrice = await referenceTypes.prices(0);
        // console.log("firstPrice: ", firstPrice);
        // const firstName = await referenceTypes.names(0);
        // console.log("firstName: ", firstName);

        const products = await referenceTypes.getProducts();
        console.log("products: ", products);
        setProducts(products);

        const buyers = await referenceTypes.buyers(0);
        console.log("buyers: ", buyers);

        const orders = await referenceTypes.orders(
          "First",
          "0xD6C73105F26998460325c0C814051b9a6674bbEb"
        );
        console.log("orders: ", orders);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleAddProductSubmit = async (event) => {
    event.preventDefault();
    try {
      //   const contract = await getReferenceTypesWithSigner();
      const tx = await (
        await getReferenceTypesWithSigner()
      ).addProduct(
        BigInt(priceRef.current.value),
        nameRef.current.value,
        isAvaliableRef.current.checked
      );
      await tx.wait();
      // router.reload();
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <h3>{`Current product = name: ${currentProduct.name}, price: ${
        currentProduct.price
      }, ${
        currentProduct.isAvaliable ? "Is avaliable." : "Is not avaliable."
      }`}</h3>
      <h3>Current Order = {currentOrder + ""}</h3>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>{price.toString()}</li>
        ))}
      </ul>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <ul>
        {products.map((currentProduct, index) => (
          <li key={index}>{`Current product = name: ${
            currentProduct.name
          }, price: ${currentProduct.price}, ${
            currentProduct.isAvaliable ? "Is avaliable." : "Is not avaliable."
          }`}</li>
        ))}
      </ul>
      {/* 
      <ul>
        {someArr.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <button onClick={() => someArr.push("someName")}>Add someName</button> Разбираемся с иммутабельностью
      <button onClick={() => setSomeArr([...someArr, "new name"])}>Add someName</button> */}
      <form onSubmit={handleAddProductSubmit}>
        <input ref={nameRef} type="text" />
        <input ref={priceRef} type="number" />
        <input ref={isAvaliableRef} type="checkbox" />
        <button>Add Product</button>
      </form>
    </Layout>
  );
};

export default ReferenceTypes;
