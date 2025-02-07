import { useState, useEffect } from "react";
import { useWallet } from "../context/walletContext";
import { motion } from "framer-motion";

import * as FAIcons from "react-icons/fa";
import * as SIIcons from "react-icons/si";
import { Link } from "react-router-dom";

const networkDetails = {
  homestead: {
    name: "Ethereum",
    icon: <FAIcons.FaEthereum className="text-blue-400" />,
    token: "ETH",
  },
  sepolia: {
    name: "Sepolia Testnet",
    icon: <FAIcons.FaEthereum className="text-blue-400" />,
    token: "ETH",
  },
  "bnb-smart-chain": {
    name: "Binance Smart Chain",
    icon: <SIIcons.SiBinance className="text-yellow-400" />,
    token: "BNB",
  },
  supcoin: {
    name: "SupCoin",
    icon: <SIIcons.SiEthereum className="text-green-400" />,
    token: "SUP",
  },
};

const Navbar = () => {
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("ETH");
  const { connectWallet, disconnectWallet, wallet } = useWallet();
  const [animatedAddress, setAnimatedAddress] = useState("");

  useEffect(() => {
    if (wallet?.network && networkDetails[wallet.network]) {
      setToken(networkDetails[wallet.network].token);
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet?.address) {
      let i = 0;
      const interval = setInterval(() => {
        setAnimatedAddress(wallet.address.slice(0, i + 1));
        i++;
        if (i > wallet.address.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setAnimatedAddress("");
    }
  }, [wallet?.address]);

  const copyToClipboard = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = async () => {
    // const address = await connectWallet(setWallet);
    // if (address) {
    //   setWallet((prevWallet) => ({
    //     ...prevWallet,
    //     address,
    //   }));
    // }
    await connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  return (
    <div className="navbar bg-background-light text-primary-content border-b border-border-dark px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-accent">
        CRYPTOPOLY
      </Link>
      {wallet ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {/* Adresse du Wallet avec animation typing */}
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-white">
            <span className="text-sm">
              {animatedAddress.slice(0, 6)}...{wallet.address.slice(-4)}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-white"
          >
            {networkDetails[wallet.network]?.icon || <FAIcons.FaEthereum />}
            <span className="text-sm">
              {parseFloat(wallet.balance).toFixed(4)} {token}
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-white"
          >
            {networkDetails[wallet.network]?.icon}
            {networkDetails[wallet.network]?.name || "Inconnu"}
          </motion.span>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="btn btn-secondary hover:text-accent text-xs w-24"
            onClick={handleDisconnect}
          >
            Disconnect
          </motion.button>
        </motion.div>
      ) : (
        <button className="btn btn-accent" onClick={handleConnect}>
          Connect to MetaMask
        </button>
      )}
    </div>
  );
};

export default Navbar;
