import { Contract } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "bool", name: "_isAvailable", type: "bool" },
    ],
    name: "addProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "buyers",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentOrder",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentProduct",
    outputs: [
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "bool", name: "isAvailable", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNames",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrices",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProducts",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "bool", name: "isAvailable", type: "bool" },
        ],
        internalType: "struct ReferenceTypes.Product[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_name", type: "string" }],
    name: "makeAnOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "names",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "orders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "prices",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "products",
    outputs: [
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "bool", name: "isAvailable", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const referenceTypes = new Contract(
  process.env.referenceTypesAddress,
  abi,
  defaultProvider
);

export default referenceTypes;
