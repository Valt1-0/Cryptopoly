import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useWallet } from "../context/walletContext";
import { ethers } from "ethers";
import { fetchFromIPFS } from "../utils/pinata";

const Profile = () => {
  const [houses, setHouses] = useState([]);
  const { provider, signer, wallet, resourceToken } = useWallet();
  const [openModalSale, setOpenModalSale] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [price, setPrice] = useState("");
  const [saleInfo, setSaleInfo] = useState({
    price: "",
    resourceType: "MAISON",
  });

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
        const houseData = await resourceToken.getHouse(houseIds[i]);
        console.log("houseData", houseData);

        const ipfsInfo = await fetchFromIPFS(houseData[3]);

        console.log("ipfsInfo", ipfsInfo);

        myHouses.push({
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
      setHouses(myHouses);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des maisons :", error);
    }
  };

  const handleSaleInfoChange = (e) => {
    const { name, value } = e.target;
    setSaleInfo((prev) => ({ ...prev, [name]: value }));
  };

  const listHouseForSale = async (e) => {
    e.preventDefault();
    try {
      const tx = await resourceToken.listHouseForSale(
        selectedHouse.id,
        ethers.parseUnits(price, 18)
      );
      await tx.wait();
      fetchMyHouses();
      setOpenModalSale(false); // Fermer la modal après la soumission
    } catch (error) {
      console.error("❌ Erreur lors de la mise en vente de la maison :", error);
    }
  };

  return (
    <div className="min-h-screen h-screen">
      <div className="bg-background-light flex flex-wrap gap-6 justify-center h-full p-6">
        <div>Account: {wallet?.address}</div>
        {houses.length === 0 ? (
          <div>Aucun NFT acheté.</div>
        ) : (
          houses.map((house) => (
            <div key={house.id}>
              <Card
                title={house.title}
                price={house.price}
                imgPath={house.imgPath}
              >
                {!house.available ? (
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-accent to-blue-400 hover:from-purple-400 hover:to-accent text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => {
                      setSelectedHouse(house);
                      setOpenModalSale(true);
                    }}
                  >
                    Remettre en vente
                  </button>
                ) : (
                  <p>Actuellement en vente</p>
                )}
              </Card>
            </div>
          ))
        )}
      </div>
      {openModalSale && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Vendre la propriété {selectedHouse.title}
            </h2>
            <form className="space-y-4" onSubmit={listHouseForSale}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prix en SUP
                </label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Vendre
              </button>
              <button
                type="button"
                className="w-full py-2 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => setOpenModalSale(false)}
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
