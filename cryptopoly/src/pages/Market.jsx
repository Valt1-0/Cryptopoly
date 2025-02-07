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
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }

    fetchAccount();
  }, []);

  useEffect(() => {
    if (provider && signer) {
      setupContracts(provider, signer);
    }
  }, [provider, signer]);

  const buyNFT = async (house) => {
    const value = ethers.utils.parseUnits(house.price.toString(), 18);
    await supCoin.approve(resourceToken.address, value);
    const tx = await resourceToken.mintResource(
      account,
      house.title,
      "House",
      value,
      house.imgPath // Use imgPath as IPFS hash for simplicity
    );
    await tx.wait();
    alert("NFT purchased successfully!");
  };

  return (
    <div className="bg-background-light flex flex-wrap gap-6 justify-center p-6">
      {houses.map((house) => (
        <Card
          key={house.id}
          title={house.title}
          price={house.price}
          imgPath={house.imgPath}
        >
          <button
            onClick={() => buyNFT(house)}
            className="btn btn-accent transition-transform duration-300 hover:scale-110 mt-4"
          >
            Buy NFT
          </button>
        </Card>
      ))}
    </div>
  );
};

export default Market;
