import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { setupContracts, supCoin, resourceToken } from "../contracts/contrat";
import { useWallet } from "../context/walletContext";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import * as FAIcons from "react-icons/fa";

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

  // useEffect(() => {
  //   async function fetchAccount() {
  //     try {
  //       const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString(16)}`;
  //       const accounts = await window.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: chainIdHex }],
  //       });
  //       setAccount(accounts[0]);
  //       console.log("Account fetched:", accounts[0]);
  //     } catch (error) {
  //       console.error("Error fetching account:", error);
  //     }
  //   }
  //   fetchAccount();
  // }, []);

  // useEffect(() => {
  //   if (provider && signer) {
  //     console.log("Setting up contracts with provider and signer");
  //     setupContracts(provider, signer);
  //     console.log("SupCoin address:", supCoin.target);
  //     console.log("ResourceToken address:", resourceToken.target);

  //     async function fetchBalance() {
  //       const balance = await supCoin.balanceOf(account);
  //       setBalance(ethers.formatUnits(balance, 18));
  //       console.log("Account balance:", ethers.formatUnits(balance, 18));
  //     }

  //     fetchBalance();
  //   }
  // }, [provider, signer, account]);

  // const buyNFT = async (house) => {
  //   try {
  //     if (!wallet?.address) {
  //       throw new Error("Account is not defined");
  //     }
  //     if (!supCoin || !resourceToken) {
  //       throw new Error("Contracts are not initialized");
  //     }
  //     console.log("Buying NFT for house:", resourceToken);
  //     console.log("Starting NFT purchase for house:", house);
  //     const value = ethers.parseUnits(house.price.toString(), 18);
  //     console.log("Approving SupCoin transfer", value, resourceToken.target);
  //     const approveTx = await supCoin.approve(resourceToken.target, value);
  //     await approveTx.wait();
  //     console.log("Approval confirmed");

  //     console.log("Minting resource token");
  //     const tx = await resourceToken.mintResource(
  //       wallet?.address,
  //       house.title,
  //       "House",
  //       value,
  //       house.imgPath // Use imgPath as IPFS hash for simplicity
  //     );
  //     await tx.wait();
  //     console.log("NFT purchased successfully!");
  //     alert("NFT purchased successfully!");
  //   } catch (error) {
  //     console.error("Error purchasing NFT:", error);
  //     alert("Error purchasing NFT. Check console for details.");
  //   }
  // };

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filtrage et recherche
  const filteredHouses = houses
    .filter((house) => house.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (filter === "cheap") return a.price - b.price;
      if (filter === "expensive") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-8 bg-gradient-to-b from-background-light via-gray-900 to-background-light min-h-screen text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold text-accent drop-shadow-lg">
          🏡 Market NFT
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Discover and purchase unique digital properties
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6"
      >
        <div>Account: {account}</div>
        <div>Balance: {balance} SUP</div>
        <input
          type="text"
          placeholder="🔍 Search for a property ... "
          className="input input-bordered input-accent w-80 text-white bg-gray-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered select-accent bg-gray-900 text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="cheap">⏳ Cheap</option>
          <option value="expensive">💎 Expensive</option>
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 mt-8"
      >
        {filteredHouses.map((house, index) => (
          <motion.div
            key={house.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card
              title={house.title}
              price={house.price}
              imgPath={house.imgPath}
              handleBuy={() => buyNFT(house)}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredHouses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-gray-400 mt-10"
        >
          <FAIcons.FaExclamationTriangle className="inline-block text-xl text-accent" />{" "}
          No property found ...
        </motion.div>
      )}
    </div>
  );
};

export default Market;
