task("create-houses", "Crée des maisons pour la mairie")
  .addParam("contract", "L'adresse du contrat ResourceToken")
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const [deployer] = await ethers.getSigners();
    const contractAddress = taskArgs.contract;

    console.log(
      `Utilisation du contrat ResourceToken à l'adresse : ${contractAddress}`
    );

    const ResourceToken = await ethers.getContractFactory("ResourceToken");
    const resourceToken = await ResourceToken.attach(contractAddress);

    const houses = [
      { name: "Modern Villa", price: 4, ipfsHash: "QmVilla123" },
      { name: "Cozy Cabin", price: 2, ipfsHash: "QmCabin456" },
      { name: "Luxury Mansion", price: 7, ipfsHash: "QmMansion789" },
      { name: "Train Station", price: 7, ipfsHash: "QmStation999" },
    ];

    for (let house of houses) {
      let tx = await resourceToken.mintHouse(
        house.name,
        house.price,
        house.ipfsHash
      );
      await tx.wait();
      console.log(
        `✅ Maison créée : ${house.name} (Prix: ${house.price} SupCoin)`
      );
    }

    console.log("Toutes les maisons ont été créées !");
  });
