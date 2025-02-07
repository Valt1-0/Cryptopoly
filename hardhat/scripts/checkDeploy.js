async function main() {
  const supCoinAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Adresse de votre contrat SupCoin

  const code = await ethers.provider.getCode(supCoinAddress);
  if (code === "0x") {
    console.error("Contract not found at address:", supCoinAddress);
  } else {
    console.log("Contract found at address:", supCoinAddress);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
