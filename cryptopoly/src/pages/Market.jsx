import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useWallet } from "../context/walletContext";
import { ethers } from "ethers";
import { fetchFromIPFS } from "../utils/pinata";

const Market = () => {
  const [balance, setBalance] = useState("0");
  const [houses, setHouses] = useState([]);
  const { provider, signer, wallet, supCoin, resourceToken } = useWallet();

  useEffect(() => {
    if (provider && signer && supCoin && resourceToken) {
      console.log("✅ Wallet détecté :", wallet?.address);
      fetchBalance();
      fetchHouses();
    }
  }, [provider, signer, wallet, supCoin, resourceToken]);

  const fetchBalance = async () => {
    try {
      if (!wallet?.address) return;
      const balance = await supCoin.balanceOf(wallet.address);
      setBalance(ethers.formatUnits(balance, 18));
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du solde :", error);
    }
  };

  const fetchHouses = async () => {
    try {
      if (!resourceToken) return;
      const houseIds = await resourceToken.getAvailableHouses();
      let availableHouses = [];

      for (let i = 0; i < houseIds.length; i++) {
        const houseData = await resourceToken.getHouse(houseIds[i]);
        console.log("houseData", houseData);

        const ipfsInfo = await fetchFromIPFS(houseData[3]);
        
        console.log("ipfsInfo", ipfsInfo);
        availableHouses.push({
          id: houseIds[i],
          title: houseData[0], // name
          type: houseData[1], // resourceType (string)
          price: ethers.formatUnits(houseData[2], 18), // value
          imgPath: ipfsInfo?.image, // ipfsHash
          createdAt: houseData[4],
          lastTransferAt: houseData[5],
          available: houseData[6], // available
        });
      }
      setHouses(availableHouses);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des maisons :", error);
    }
  };

  const buyNFT = async (house) => {
    try {
      if (!wallet?.address) throw new Error("❌ Wallet non connecté.");
      if (!supCoin || !resourceToken)
        throw new Error("❌ Contrats non initialisés.");

      console.log(`🔹 Achat en cours pour : ${house.title}`);
      const value = ethers.parseUnits(house.price.toString(), 18);

      console.log(
        "🔹 Approvisionnement nécessaire de :",
        value.toString(),
        "SUP"
      );
      const gasPrice = await provider.send("eth_gasPrice", []);
      console.log("⛽ Gas Price:", ethers.formatUnits(gasPrice, "gwei"));

      // Étape 1 : Approuver le transfert de SUP
      console.log("🔹 Approbation en cours...");
      const tx1 = await supCoin.approve(resourceToken.target, value, {
        gasLimit: 5000000,
        gasPrice: gasPrice,
      });
      await tx1.wait();
      console.log("✅ Approbation confirmée.");

      // Étape 2 : Acheter le NFT
      console.log("🔹 Achat du NFT en cours...");
      const tx2 = await resourceToken.purchaseHouse(house.id, {
        gasLimit: 5000000,
        gasPrice: gasPrice,
      });
      await tx2.wait();
      console.log("✅ NFT acheté avec succès !");

      alert("🎉 NFT acheté avec succès !");
      fetchBalance(); // Actualiser le solde après l'achat
      fetchHouses(); // Actualiser la liste des maisons disponibles
    } catch (error) {
      console.error("❌ Erreur lors de l'achat du NFT :", error);
      alert("Erreur lors de l'achat. Détails en console.");
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
        />
      ))}
    </div>
  );
};

export default Market;
