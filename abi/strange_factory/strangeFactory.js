import { Contract } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = [
  { inputs: [], name: "RemoveEvenElement", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newTitled",
        type: "address",
      },
    ],
    name: "ContractCreation",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_numberTitle", type: "uint256" },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "add",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_title", type: "string" }],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "priceOfRemoving",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "removeLast",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "titledContracts",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const strangeFactory = new Contract(
  process.env.strangeFactoryAddress,
  abi,
  defaultProvider
);

export default strangeFactory;
