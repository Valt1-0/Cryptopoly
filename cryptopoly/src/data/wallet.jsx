import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import SupCoinArtifact from "../contracts/SupCoin.json";
import contractAddress from "../contracts/contract-address.json";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      provider.getSigner().then((signer) => setSigner(signer));
    }
  }, []);

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) {
      const walletData = JSON.parse(storedWallet);
      setWallet(walletData);
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      provider.getSigner().then((signer) => setSigner(signer));
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask n'est pas installé !");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Initialisez le contrat SupCoin
      const supCoin = new ethers.Contract(
        contractAddress.SupCoin,
        SupCoinArtifact.abi,
        signer
      );

      // Récupérez la balance de SupCoin
      const balance = await supCoin.balanceOf(address);
      const network = await provider.getNetwork();

      const walletData = {
        address,
        balance: ethers.formatUnits(balance, 18),
        network: network.name,
      };

      setWallet(walletData);
      setProvider(provider);
      setSigner(signer);

      localStorage.setItem("wallet", JSON.stringify(walletData));

      return address;
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setProvider(null);
    setSigner(null);
    localStorage.removeItem("wallet");
  };

  const setupWalletListeners = () => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", async (accounts) => {
      if (accounts.length > 0) {
        await connectWallet();
      } else {
        disconnectWallet();
      }
    });

    window.ethereum.on("chainChanged", async (chainId) => {
      console.log("Réseau changé :", chainId);
      await connectWallet();
    });
  };

  useEffect(() => {
    setupWalletListeners();
  }, []);

  return (
    <WalletContext.Provider
      value={{ wallet, connectWallet, disconnectWallet, provider, signer }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
