import { Contract } from "ethers";
import defaultProvider from "./defaultProvider";

const humanReadableAbi = [
  // "bool public isTrue",
  "function isTrue() public view returns (bool)",
  "function setTrue(bool) public",
];

const abi = [
  {
    inputs: [],
    name: "bigBytes",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bigInt",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bigUint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isTrue",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "_bigBytes", type: "bytes32" }],
    name: "setBigBytes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "int256", name: "_bigInt", type: "int256" }],
    name: "setBiglInt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_bigUint", type: "uint256" }],
    name: "setBiglUint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_name", type: "string" }],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes1", name: "_smallBytes", type: "bytes1" }],
    name: "setSmallBytes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "int8", name: "_smallInt", type: "int8" }],
    name: "setSmallInt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "_smallUint", type: "uint8" }],
    name: "setSmallUint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_isTrue", type: "bool" }],
    name: "setTrue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_wallet", type: "address" }],
    name: "setWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "smallBytes",
    outputs: [{ internalType: "bytes1", name: "", type: "bytes1" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "smallInt",
    outputs: [{ internalType: "int8", name: "", type: "int8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "smallUint",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wallet",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

//   const primitives = new Contract(address, humanReadableAbi, defaultProvider);
const primitives = new Contract(
  process.env.primitivesAddress,
  abi,
  defaultProvider
);

export default primitives;
