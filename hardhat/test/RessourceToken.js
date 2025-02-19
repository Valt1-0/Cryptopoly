const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ResourceToken", function () {
  let ResourceToken, resourceToken, SupCoin, supCoin, owner, addr1;
  const initialSupply = ethers.utils.parseUnits("10", 18);

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Déploiement du token ERC20
    SupCoin = await ethers.getContractFactory("SupCoin");
    supCoin = await SupCoin.deploy(initialSupply);
    await supCoin.deployed();

    // Déploiement du contrat ResourceToken
    ResourceToken = await ethers.getContractFactory("ResourceToken");
    resourceToken = await ResourceToken.deploy(supCoin.address);
    await resourceToken.deployed();

    // Approve pour permettre les transactions
    await supCoin.connect(owner).approve(resourceToken.address, initialSupply);
    await supCoin.connect(addr1).approve(resourceToken.address, initialSupply);
  });

  it("Should mint a new house", async function () {
    const tx = await resourceToken.mintHouse(
      "Maison de Luxe",
      0,
      ethers.utils.parseUnits("1000", 18),
      "Qm...hash"
    );
    await tx.wait();

    expect(await resourceToken.ownerOf(1)).to.equal(owner.address);
  });

  it("Should fail if payment fails", async function () {
    await resourceToken.mintHouse(
      "Maison de Luxe",
      0,
      ethers.utils.parseUnits("1000", 18),
      "Qm...hash"
    );

    const amount = ethers.utils.parseUnits("500", 18);

    // On donne 1000 SUP à addr1
    await supCoin.transfer(addr1.address, amount);

    // 🛠️ Solution : On approuve le contrat pour permettre le paiement
    await supCoin.connect(addr1).approve(resourceToken.address, amount);

    await expect(
      resourceToken.connect(addr1).purchaseHouse(1)
    ).to.be.revertedWithCustomError(resourceToken, "PaymentFailed");
  });

  it("Should list a house for sale", async function () {
    await resourceToken.mintHouse(
      "Maison de Luxe",
      0,
      ethers.utils.parseUnits("1000", 18),
      "Qm...hash"
    );

    // L'achat doit être fait pour changer l'état de la maison
    await supCoin.transfer(addr1.address, ethers.utils.parseUnits("1000", 18));
    await supCoin
      .connect(addr1)
      .approve(resourceToken.address, ethers.utils.parseUnits("1000", 18));
    await resourceToken.connect(addr1).purchaseHouse(1);

    // Vérifier que la maison est maintenant indisponible
    let house = await resourceToken.houses(1);
    expect(house.available).to.be.false;

    // Liste la maison à nouveau
    await resourceToken
      .connect(addr1)
      .listHouseForSale(1, ethers.utils.parseUnits("1000", 18), 0);

    // Vérifier que la maison est bien listée à nouveau
    house = await resourceToken.houses(1);
    expect(house.available).to.be.true;
  });

  it("Should fail if house is already on sale", async function () {
    await resourceToken.mintHouse(
      "Maison de Luxe",
      0,
      ethers.utils.parseUnits("1000", 18),
      "Qm...hash"
    );

    // Vérifier que la maison est déjà en vente immédiatement après mint
    let house = await resourceToken.houses(1);
    expect(house.available).to.be.true;

    // Essayer de la remettre en vente sans passer par une vente
    await expect(
      resourceToken.listHouseForSale(1, ethers.utils.parseUnits("1000", 18), 0)
    ).to.be.revertedWith("House is already on sale");
  });
});
