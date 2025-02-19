import { useState, useEffect } from "react";
import { useWallet } from "../context/walletContext";
import { motion } from "framer-motion";
import * as FAIcons from "react-icons/fa";
import * as SIIcons from "react-icons/si";
import { Link } from "react-router-dom";

const networkDetails = {
  sepolia: {
    name: "Sepolia Testnet",
    icon: <FAIcons.FaEthereum className="text-blue-400" />,
    token: "ETH",
  },
  supcoin: {
    name: "SupCoin",
    icon: <SIIcons.SiEthereum className="text-purple-400" />,
    token: "SUP",
  },
};

// Détails du réseau SupCoin
const SUPCOIN_NETWORK_PARAMS = {
  chainId: "0x7A69",
  chainName: "SupCoin",
  iconUrls: [
    "https://scontent.frns1-1.fna.fbcdn.net/v/t39.30808-6/333993870_770478147936292_6413207552341760167_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3RyKQxy77DEQ7kNvgHYUGyQ&_nc_zt=23&_nc_ht=scontent.frns1-1.fna&_nc_gid=A5X1o0c79xkryiNW5CvLusy&oh=00_AYBJRjZfPM2Q072l0qWdYlZJ5WhE3guB4msneXjd9KLc_A&oe=67BAF1E5",
  ],
  nativeCurrency: {
    decimals: 18,
    name: "SupCoin",
    symbol: "SUP",
  },
  rpcUrls: ["http://127.0.0.1:8545"],
};

const Navbar = () => {
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("ETH");
  const { connectWallet, disconnectWallet, wallet } = useWallet();
  const [animatedAddress, setAnimatedAddress] = useState("");

  useEffect(() => {
    if (wallet?.network && networkDetails[wallet.network]) {
      setToken(networkDetails[wallet.network].token);
      console.log("Token:", networkDetails[wallet.network].token);
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
    await addSupCoinToMetaMask();
    await connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const addSupCoinToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [SUPCOIN_NETWORK_PARAMS],
        });
        console.log("✅ SupCoin ajouté à MetaMask !");
      } catch (error) {
        console.error("❌ Erreur lors de l'ajout du réseau :", error);
      }
    } else {
      alert("MetaMask n'est pas installé !");
    }
  };

  return (
    <div className="navbar bg-background-light text-primary-content border-b border-border-dark px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-accent">
        CRYPTOPOLY
      </Link>
      {wallet && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="btn btn-secondary hover:text-accent text-xs w-24"
        >
          <Link to="/add-house">
            <FAIcons.FaPlus />
            Add House (DEV TEST)
          </Link>
        </motion.div>
      )}
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
            {networkDetails[wallet.network]?.icon || <FAIcons.FaQuestion />}
            {networkDetails[wallet.network]?.name || "Inconnu"}
          </motion.span>

          {/* Bouton Ajouter SupCoin */}
          {/* <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="btn btn-primary hover:text-accent text-xs w-32"
            onClick={addSupCoinToMetaMask}
          >
            + Add SupCoin to MetaMask
          </motion.button> */}

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
