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
}

function setupWalletListeners(setWallet) {
  if (!window.ethereum) return;

  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length > 0) {
      await connectWallet(setWallet);
    } else {
      disconnectWallet(setWallet);
    }
  });

  window.ethereum.on("chainChanged", async (chainId) => {
    console.log("Réseau changé :", chainId);
    await connectWallet(setWallet);
  });
}

export { connectWallet, disconnectWallet, setupWalletListeners };
