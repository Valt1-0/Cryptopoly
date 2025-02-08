import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useWallet } from "../context/walletContext";
import { ethers } from "ethers";

const Profile = () => {
  const [houses, setHouses] = useState([]);
  const { provider, signer, wallet, resourceToken } = useWallet();

  useEffect(() => {
    if (provider && signer && resourceToken) {
      console.log("✅ Wallet détecté :", wallet?.address);
      fetchMyHouses();
    }
  }, [provider, signer, wallet, resourceToken]);

  const fetchMyHouses = async () => {
    try {
      if (!wallet?.address) return;
      const houseIds = await resourceToken.getMyHouses();
      let myHouses = [];

      for (let i = 0; i < houseIds.length; i++) {
        const house = await resourceToken.houses(houseIds[i]);
        myHouses.push({
          id: houseIds[i],
          title: house.name,
          price: ethers.formatUnits(house.price, 18),
          imgPath: house.ipfsHash,
          available: house.available,
        });
      }
      setHouses(myHouses);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des maisons :", error);
    }
  };

  return (
    <div className="bg-background-light flex flex-wrap gap-6 justify-center p-6">
      <div>Account: {wallet?.address}</div>
      {houses.length === 0 ? (
        <div>Aucun NFT acheté.</div>
      ) : (
        houses.map((house) => (
          <Card
            key={house.id}
            title={house.title}
            price={house.price}
            imgPath={house.imgPath}
          />
        ))
      )}
    </div>
  );
};

export default Profile;
