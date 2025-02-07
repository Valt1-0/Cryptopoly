import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

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

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask n'est pas installé !");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setWallet({
        address,
        balance: ethers.formatEther(balance),
        network: network.name,
        provider,
      });

      setProvider(provider);
      setSigner(signer);

      return address;
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setProvider(null);
    setSigner(null);
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
