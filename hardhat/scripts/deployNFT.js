const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  const ResourceToken = await ethers.getContractFactory("ResourceToken");
  const resourceToken = await ResourceToken.deploy();
  await resourceToken.deployed();

  console.log("ResourceToken address:", resourceToken.address);

  saveFrontendFiles(resourceToken);
}

function saveFrontendFiles(resourceToken) {
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
    JSON.stringify({ ResourceToken: resourceToken.address }, null, 2)
  );

  const ResourceTokenArtifact = artifacts.readArtifactSync("ResourceToken");

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
