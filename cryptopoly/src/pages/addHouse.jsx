import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../context/walletContext";
import { uploadToIPFS } from "../utils/pinata";

const AddHouse = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const { provider, signer, wallet, resourceToken } = useWallet();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddHouse = async (e) => {
    e.preventDefault();

    try {
      if (!wallet?.address) throw new Error("❌ Wallet non connecté.");
      if (!resourceToken)
        throw new Error("❌ Contrat de ResourceToken non initialisé.");
      if (!file) throw new Error("❌ Veuillez ajouter une image.");

      const metadata = {
        name,
        value: price,
        attributes: {
          size: "150m²",
          category: "Résidentiel",
          rarity: "Rare",
        },
      };

      // Upload de l'image sur IPFS via Pinata
      const ipfsResponse = await uploadToIPFS(file, metadata, wallet?.address);
      const ipfsHash = ipfsResponse.cid;

      const value = ethers.parseUnits(price, 18);

      // Appel du smart contract
      const tx = await resourceToken.mintHouse(name, value, ipfsHash, {
        gasLimit: 10000000,
      });

      await tx.wait();
      alert("✅ Maison ajoutée avec succès !");
      setName("");
      setPrice("");
      setFile(null);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout de la maison :", error);
      alert("Erreur lors de l'ajout. Détails en console.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Ajouter une Maison
        </h2>
        <form onSubmit={handleAddHouse} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de la Maison
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prix en SUP
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image de la Maison
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Ajouter la Maison
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHouse;
