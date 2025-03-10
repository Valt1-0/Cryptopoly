const fs = require("fs");
const path = require("path");

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ receiver }, { ethers, network }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          " gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }

    const addressesFile = path.join(
      __dirname,
      "..",
      "..",
      "cryptopoly",
      "src",
      "contracts",
      "contract-address.json"
    );

    if (!fs.existsSync(addressesFile)) {
      console.error("You need to deploy your contract first");
      return;
    }

    const addressJson = fs.readFileSync(addressesFile);
    const address = JSON.parse(addressJson);

    if ((await ethers.provider.getCode(address.SupCoin)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const supCoin = await ethers.getContractAt("SupCoin", address.SupCoin);
    const [sender] = await ethers.getSigners();

    // Vérifiez le solde du compte sender
    const senderBalance = await supCoin.balanceOf(sender.address);
    const transferAmount = ethers.utils.parseUnits("100", 18);

    if (senderBalance.lt(transferAmount)) {
      console.error("Not enough tokens");
      return;
    }

    // Transfert de SUP
    const supTx = await supCoin.transfer(receiver, transferAmount);
    await supTx.wait();
    console.log(`Transferred 100 SUP to ${receiver}`);

    // Transfert de ETH
    const ethTx = await sender.sendTransaction({
      to: receiver,
      value: ethers.utils.parseEther("1"), // 1 ETH
    });
    await ethTx.wait();
    console.log(`Transferred 1 ETH to ${receiver}`);
  });

module.exports = {};
