import { Contract } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = ["function name() public view returns (string)"];

const Titled = (address) => new Contract(address, abi, defaultProvider);

export default Titled;
