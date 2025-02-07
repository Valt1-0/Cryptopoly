const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  // Deploy SupCoin contract
  const SupCoin = await ethers.getContractFactory("SupCoin");
  const supCoin = await SupCoin.deploy(1000000); // Initial supply
  await supCoin.deployed();
  console.log("SupCoin address:", supCoin.address);

  // Deploy ResourceToken contract with SupCoin address
  const ResourceToken = await ethers.getContractFactory("ResourceToken");
  const resourceToken = await ResourceToken.deploy(supCoin.address);
  await resourceToken.deployed();
  console.log("ResourceToken address:", resourceToken.address);

  saveFrontendFiles(supCoin, resourceToken);
}

function saveFrontendFiles(supCoin, resourceToken) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "..",
    "cryptopoly",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      { SupCoin: supCoin.address, ResourceToken: resourceToken.address },
      null,
      2
    )
  );

  const SupCoinArtifact = artifacts.readArtifactSync("SupCoin");
  const ResourceTokenArtifact = artifacts.readArtifactSync("ResourceToken");

  fs.writeFileSync(
    path.join(contractsDir, "SupCoin.json"),
    JSON.stringify(SupCoinArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "ResourceToken.json"),
    JSON.stringify(ResourceTokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
