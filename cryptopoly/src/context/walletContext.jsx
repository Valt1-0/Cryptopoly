import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import SupCoinArtifact from "../contracts/SupCoin.json";
import ResourceTokenArtifact from "../contracts/ResourceToken.json";
import contractAddress from "../contracts/contract-address.json";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [supCoin, setSupCoin] = useState(null);
  const [resourceToken, setResourceToken] = useState(null);
  const [isLocal, setIsLocal] = useState(false); // État pour déterminer si nous sommes en mode local

  useEffect(() => {
    let provider;

    if (window.ethereum ) {
      // Utilisation de Metamask si disponible
      provider = new ethers.BrowserProvider(window.ethereum);
      console.log("Metamask détecté");
      setIsLocal(false); // Ce n'est pas un environnement local
    } else {
      // Sinon, utilisation de Hardhat local
      provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      setIsLocal(true); // C'est un environnement local
    }

    setProvider(provider);

    provider
      .getSigner()
      .then(async (signer) => {
        setSigner(signer);
        await initializeContracts(signer);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du signer:", error);
      });
  }, []);

  const initializeContracts = async (signer) => {
    const supCoin = new ethers.Contract(
      contractAddress.SupCoin,
      SupCoinArtifact.abi,
      signer
    );
    const resourceToken = new ethers.Contract(
      contractAddress.ResourceToken,
      ResourceTokenArtifact.abi,
      signer
    );
    setSupCoin(supCoin);
    setResourceToken(resourceToken);
  };

  // Ce useEffect dépend de supCoin pour récupérer la balance
  useEffect(() => {
    if (supCoin && signer && !isLocal) {
      const fetchBalance = async () => {
        try {
          let walletAddress = await signer.getAddress();
          if (!walletAddress) {
            walletAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Remplace par l'adresse de ton compte Hardhat
          }
          console.log("Adresse du wallet:", walletAddress);
          const balance = await supCoin.balanceOf(walletAddress);
          const network = await provider.getNetwork();

          const walletData = {
            address: walletAddress,
            balance: ethers.formatUnits(balance, 18),
            network: network.name,
          };

          setWallet(walletData);
          localStorage.setItem("wallet", JSON.stringify(walletData));

          console.log("Wallet connecté:", walletData);
        } catch (error) {
          console.error("Erreur lors de la récupération du solde:", error);
        }
      };
      fetchBalance();
    } else if (isLocal) {
      const localWalletData = {
        address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Adresse simulée
        balance: "1000", // Solde fictif
        network: "localhost",
      };
      setWallet(localWalletData);
    }
  }, [supCoin, signer, provider, isLocal]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask n'est pas installé !");
      return;
    }

    try {
      console.log("Requesting accounts...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Initialisez les contrats SupCoin et ResourceToken
      initializeContracts(signer);

      setProvider(provider);
      setSigner(signer);

      const walletData = {
        address,
        balance: "1000", // Solde fictif, à ajuster si vous êtes en mode local
        network: "localhost", // Si local
      };

      localStorage.setItem("wallet", JSON.stringify(walletData));

      console.log("Wallet connected:", walletData);
      return address;
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setProvider(null);
    setSigner(null);
    setSupCoin(null);
    setResourceToken(null);
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
    if (!isLocal) {
      setupWalletListeners();
    }
  }, [isLocal]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
        provider,
        signer,
        supCoin,
        resourceToken,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
