import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { setupContracts, supCoin, resourceToken } from "../contracts/contrat";
import { useWallet } from "../context/walletContext";
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
  const [balance, setBalance] = useState("0");
  const { provider, signer, wallet } = useWallet();

  useEffect(() => {
    async function fetchAccount() {
      try {
        const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString(16)}`;
        const accounts = await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
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
      console.log("SupCoin address:", supCoin.target);
      console.log("ResourceToken address:", resourceToken.target);

      async function fetchBalance() {
        const balance = await supCoin.balanceOf(account);
        setBalance(ethers.formatUnits(balance, 18));
        console.log("Account balance:", ethers.formatUnits(balance, 18));
      }

      fetchBalance();
    }
  }, [provider, signer, account]);

  const buyNFT = async (house) => {
    try {
      if (!wallet?.address) {
        throw new Error("Account is not defined");
      }
      if (!supCoin || !resourceToken) {
        throw new Error("Contracts are not initialized");
      }
      console.log("Buying NFT for house:", resourceToken);
      console.log("Starting NFT purchase for house:", house);
      const value = ethers.parseUnits(house.price.toString(), 18);
      console.log("Approving SupCoin transfer", value, resourceToken.target);
      const approveTx = await supCoin.approve(resourceToken.target, value);
      await approveTx.wait();
      console.log("Approval confirmed");

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
      <div>Account: {account}</div>
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
