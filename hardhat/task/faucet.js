const fs = require("fs");
const path = require("path");
task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ receiver }, { ethers }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
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
    console.log(addressesFile);
    if (!fs.existsSync(addressesFile)) {
      console.error("You need to deploy your contract first");
      return;
    }

    const addressJson = fs.readFileSync(addressesFile);
    const address = JSON.parse(addressJson);
    console.log(
      "address ",
      address.SupCoin,
      await ethers.provider.getCode(address.SupCoin)
    );
    if ((await ethers.provider.getCode(address.SupCoin)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const supCoin = await ethers.getContractAt("SupCoin", address.SupCoin);
    const [sender] = await ethers.getSigners();

    const tx = await supCoin.transfer(
      receiver,
      ethers.utils.parseUnits("100", 18)
    );
    await tx.wait();

    const tx2 = await sender.sendTransaction({
      to: receiver,
      value: ethers.utils.parseEther("1"),
    });
    await tx2.wait();

    console.log(`Transferred 1 ETH and 100 SUP to ${receiver}`);
  });

module.exports = {};
