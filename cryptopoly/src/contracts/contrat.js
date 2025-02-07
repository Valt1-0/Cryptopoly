import { ethers } from "ethers";
import SupCoinArtifact from "./SupCoin.json";
import ResourceTokenArtifact from "./ResourceToken.json";
import contractAddress from "./contract-address.json";

let supCoin;
let resourceToken;

const setupContracts = (provider, signer) => {
  if (provider && signer) {
    console.log("Setting up contracts with provider and signer");
    console.log("SupCoin address:", contractAddress.SupCoin);
    console.log("ResourceToken address:", contractAddress.ResourceToken);
    console.log("Signer address:", signer);
    console.log("abi", SupCoinArtifact.abi);
    supCoin = new ethers.Contract(
      contractAddress.SupCoin,
      SupCoinArtifact.abi,
      signer
    );

    resourceToken = new ethers.Contract(
      contractAddress.ResourceToken,
      ResourceTokenArtifact.abi,
      signer
    );

    console.log("SupCoin address:", supCoin.target);
    console.log("ResourceToken address:", resourceToken);
  } else {
    console.error("Provider or signer not found. Please connect your wallet.");
  }
};

export { setupContracts, supCoin, resourceToken };
