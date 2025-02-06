import {
  connectWallet,
  disconnectWallet,
  setupWalletListeners,
} from "../data/wallet";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [wallet, setWallet] = useState(null);

  const handleConnect = async () => {
    const data = await connectWallet();
    if (data) setWallet(data);
  };

  useEffect(() => {
    setupWalletListeners(setWallet);
  }, []);

  return (
    <div className="navbar bg-background-light text-primary-content border-b border-border-dark">
      <div className="flex-1">
        <a className="text-xl font-bold text-accent">CRYPTOPOLY</a>
      </div>
      {wallet ? (
        <div className="ml-4">
          <p className="text-sm">
            <strong>Adresse:</strong> {wallet.address.slice(0, 6)}...
          </p>
          <p className="text-sm">
            <strong>Solde:</strong> {wallet.balance} ETH
          </p>
          <p className="text-sm">
            <strong>Réseau:</strong> {wallet.network}
          </p>
          <button
            className="btn btn-secondary mt-2"
            onClick={() => disconnectWallet(setWallet)}
          >
            Déconnecter
          </button>
        </div>
      ) : (
        <div className="flex-none">
          <button
            className="btn btn-accent"
            onClick={() => connectWallet(setWallet)}
          >
            Connecter MetaMask
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
