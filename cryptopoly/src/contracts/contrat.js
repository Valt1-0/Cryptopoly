import { ethers } from "ethers";
import ResourceTokenArtifact from "./ResourceToken.json";
import contractAddress from "./contract-address.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const resourceToken = new ethers.Contract(
  contractAddress.ResourceToken,
  ResourceTokenArtifact.abi,
  signer
);

export default resourceToken;
