import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { setupContracts, supCoin, resourceToken } from "../contracts/contrat";
import { useWallet } from "../data/wallet";
import { ethers } from "ethers";

const houses = [
  {
    id: 1,
    title: "Modern Villa",
    price: 4,
    imgPath:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Cozy Cabin",
    price: 2,
    imgPath:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Luxury Mansion",
    price: 7,
    imgPath:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Train Station",
    price: 7,
    imgPath:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Market = () => {
  const [account, setAccount] = useState("");
  const { provider, signer } = useWallet();

  useEffect(() => {
    async function fetchAccount() {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Account fetched:", accounts[0]);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    }

    fetchAccount();
  }, []);

  useEffect(() => {
    if (provider && signer) {
      console.log("Setting up contracts with provider and signer");
      setupContracts(provider, signer);
    }
  }, [provider, signer]);

  const buyNFT = async (house) => {
    try {
      if (!account) {
        throw new Error("Account is not defined");
      }
      if (!supCoin || !resourceToken) {
        throw new Error("Contracts are not initialized");
      }
      console.log("Starting NFT purchase for house:", house);
      const value = ethers.parseUnits(house.price.toString(), 18);
      console.log("Approving SupCoin transfer", value, resourceToken.target);
      await supCoin.approve(resourceToken.target, value);
      console.log("Minting resource token");
      const tx = await resourceToken.mintResource(
        account,
        house.title,
        "House",
        value,
        house.imgPath // Use imgPath as IPFS hash for simplicity
      );
      await tx.wait();
      console.log("NFT purchased successfully!");
      alert("NFT purchased successfully!");
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      alert("Error purchasing NFT. Check console for details.");
    }
  };

  return (
    <div className="bg-background-light flex flex-wrap gap-6 justify-center p-6">
      {houses.map((house) => (
        <Card
          key={house.id}
          title={house.title}
          price={house.price}
          imgPath={house.imgPath}
          handleBuy={() => buyNFT(house)}
        ></Card>
      ))}
    </div>
  );
};

export default Market;
