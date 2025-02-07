require("@nomicfoundation/hardhat-toolbox");
require("./task/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.22",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
