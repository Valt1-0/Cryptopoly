import { ethers } from "ethers";
import SupCoinArtifact from "./SupCoin.json";
import ResourceTokenArtifact from "./ResourceToken.json";
import contractAddress from "./contract-address.json";

let supCoin;
let resourceToken;

const setupContracts = (provider, signer) => {
  if (provider && signer) {
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
  } else {
    console.error("Provider or signer not found. Please connect your wallet.");
  }
};

export { setupContracts, supCoin, resourceToken };
