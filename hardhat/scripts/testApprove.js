const { ethers } = require("hardhat");

async function main() {
  const [deployer, user] = await ethers.getSigners();
  console.log("Deploying the contracts with the account:", deployer.address);

  // Deploy SupCoin contract
  const SupCoin = await ethers.getContractFactory("SupCoin");
  const supCoin = await SupCoin.deploy(1000000); // Initial supply
  await supCoin.deployed();
  console.log("SupCoin deployed to:", supCoin.address);

  // Deploy ResourceToken contract with SupCoin address
  const ResourceToken = await ethers.getContractFactory("ResourceToken");
  const resourceToken = await ResourceToken.deploy(supCoin.address);
  await resourceToken.deployed();
  console.log("ResourceToken deployed to:", resourceToken.address);

  // Test approve function
  const amount = ethers.utils.parseUnits("100", 18); // Approve 100 SUP
  console.log(
    `Approving ${amount.toString()} SUP from ${user.address} to ${
      resourceToken.address
    }`
  );

  // Transfer some SUP to the user
  await supCoin.transfer(user.address, amount);
  console.log(`Transferred ${amount.toString()} SUP to ${user.address}`);

  // Approve ResourceToken contract to spend SUP on behalf of the user
  const approveTx = await supCoin
    .connect(user)
    .approve(resourceToken.address, amount);
  await approveTx.wait();
  console.log(
    `Approved ${amount.toString()} SUP from ${user.address} to ${
      resourceToken.address
    }`
  );

  // Check allowance
  const allowance = await supCoin.allowance(
    user.address,
    resourceToken.address
  );
  console.log(`Allowance: ${allowance.toString()} SUP`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
