import { ethers } from "ethers";

async function connectWallet(setWallet) {
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

    console.log("Adresse :", address);
    console.log("Solde :", ethers.formatEther(balance), "ETH");
    console.log("Réseau :", network.name, `(Chain ID: ${network.chainId})`);

    setWallet({
      address,
      balance: ethers.formatEther(balance),
      network: network.name,
      provider,
    });

    return address;
  } catch (error) {
    console.error("Erreur de connexion :", error);
  }
}

async function disconnectWallet(setWallet) {
  setWallet(null);
  console.log("Wallet déconnecté");
}

function setupWalletListeners(setWallet) {
  if (!window.ethereum) return;

  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length > 0) {
      console.log("Changement de compte :", accounts[0]);
      await connectWallet(setWallet);
    } else {
      console.log("Compte déconnecté");
      disconnectWallet(setWallet);
    }
  });

  window.ethereum.on("chainChanged", async (chainId) => {
    console.log("Réseau changé :", chainId);
    await connectWallet(setWallet);
  });
}

export { connectWallet, disconnectWallet, setupWalletListeners };
