require("@nomicfoundation/hardhat-toolbox");
require("./task/faucet");
require("./task/createHouses.js");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: 5000000, // Augmente la limite de gas
      gasPrice: 20000000000, // Ajuste le prix du gas
    },
  },
};
