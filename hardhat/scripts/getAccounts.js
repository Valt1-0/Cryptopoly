async function main() {
  const [deployer, ...accounts] = await ethers.getSigners();

  console.log("Adresse du déployeur :", deployer.address);
  console.log(
    "Autres comptes :",
    accounts.map((account) => account.address)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
