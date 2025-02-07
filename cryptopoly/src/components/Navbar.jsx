import { useState, useEffect } from "react";
import {
  connectWallet,
  disconnectWallet,
  setupWalletListeners,
} from "../data/wallet";
import * as FAIcons from "react-icons/fa";
import * as SIIcons from "react-icons/si";

const networkDetails = {
  homestead: {
    name: "Ethereum",
    icon: <FAIcons.FaEthereum className="text-blue-400" />,
    token: "ETH",
  },
  goerli: {
    name: "Goerli Testnet",
    icon: <FAIcons.FaEthereum className="text-blue-400" />,
    token: "ETH",
  },
  sepolia: {
    name: "Sepolia Testnet",
    icon: <FAIcons.FaEthereum className="text-blue-400" />,
    token: "ETH",
  },
  polygon: {
    name: "Polygon",
    icon: <SIIcons.SiPolygon className="text-purple-400" />,
    token: "MATIC",
  },
  "bnb-smart-chain": {
    name: "Binance Smart Chain",
    icon: <SIIcons.SiBinance className="text-yellow-400" />,
    token: "BNB",
  },
};

const Navbar = () => {
  const [wallet, setWallet] = useState(null);
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("ETH"); // Par défaut ETH

  useEffect(() => {
    setupWalletListeners(setWallet);
  }, []);

  useEffect(() => {
    if (wallet?.network && networkDetails[wallet.network]) {
      setToken(networkDetails[wallet.network].token);
    }
  }, [wallet]);

  const copyToClipboard = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = async () => {
    const address = await connectWallet(setWallet);
    if (address) {
      setWallet((prevWallet) => ({
        ...prevWallet,
        address,
      }));
    }
  };

  const handleDisconnect = () => {
    disconnectWallet(setWallet);
  };

  return (
    <div className="navbar bg-background-light text-primary-content border-b border-border-dark px-6 py-3 flex items-center justify-between">
      <a className="text-xl font-bold text-accent">CRYPTOPOLY</a>

      {wallet ? (
        <div className="flex items-center gap-4">
          {/* Adresse du Wallet */}
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-white">
            <span className="text-sm">
              {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
            </span>
            <button
              onClick={copyToClipboard}
              className="p-1 text-slate-400 hover:text-accent"
            >
              {copied ? (
                <FAIcons.FaCheck className="text-accent" />
              ) : (
                <FAIcons.FaCopy />
              )}
            </button>
          </div>

          {/* Solde du Wallet */}
          <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-white">
            {networkDetails[wallet.network]?.icon || <FAIcons.FaEthereum />}
            <span className="text-sm">
              {parseFloat(wallet.balance).toFixed(4)} {token}
            </span>
          </div>

          {/* Réseau */}
          <span className="text-sm flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-white">
            {networkDetails[wallet.network]?.icon}
            {networkDetails[wallet.network]?.name || "Inconnu"}
          </span>

          {/* Bouton Déconnexion */}
          <button
            className="btn btn-secondary hover:text-accent"
            onClick={handleDisconnect}
          >
            Déconnecter
          </button>
        </div>
      ) : (
        <button className="btn btn-accent" onClick={handleConnect}>
          Connecter MetaMask
        </button>
      )}
    </div>
  );
};

export default Navbar;
