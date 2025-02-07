import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useWallet } from "../context/walletContext";
import { ethers } from "ethers";

const HARDHAT_NETWORK_ID = 31337;

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
  const [balance, setBalance] = useState("0");
  const { provider, signer, wallet, supCoin, resourceToken } = useWallet();

  useEffect(() => {
    if (provider && signer && supCoin) {
      console.log("Setting up contracts with provider and signer");
      console.log("SupCoin address:", supCoin.target);
      console.log("ResourceToken address:", resourceToken.target);

      async function fetchBalance() {
        const balance = await supCoin.balanceOf(wallet?.address);
        setBalance(ethers.formatUnits(balance, 18));
        console.log("Account balance:", ethers.formatUnits(balance, 18));
      }

      fetchBalance();
    }
  }, [provider, signer, wallet, supCoin]);

  const buyNFT = async (house) => {
    try {
      if (!wallet?.address) {
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
        wallet?.address,
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
      <div>Account: {wallet?.address}</div>
      <div>Balance: {balance} SUP</div>
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
