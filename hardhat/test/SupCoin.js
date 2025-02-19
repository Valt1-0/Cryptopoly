const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupCoin", function () {
  let SupCoin, supCoin, owner, addr1, addr2;
  const initialSupply = ethers.utils.parseUnits("1000000", 18);

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    SupCoin = await ethers.getContractFactory("SupCoin");
    supCoin = await SupCoin.deploy(initialSupply);
    await supCoin.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await supCoin.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const expectedSupply = initialSupply.mul(
        ethers.BigNumber.from(10).pow(await supCoin.decimals())
      );
      expect((await supCoin.balanceOf(owner.address)).toString()).to.equal(
        expectedSupply.toString()
      );
    });

    it("Should have the correct token name and symbol", async function () {
      expect(await supCoin.name()).to.equal("SupCoin");
      expect(await supCoin.symbol()).to.equal("SUP");
    });

    it("Should have 18 decimals", async function () {
      expect(await supCoin.decimals()).to.equal(18);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.utils.parseUnits("1000", 18);
      await supCoin.transfer(addr1.address, amount);

      expect((await supCoin.balanceOf(addr1.address)).toString()).to.equal(
        amount.toString()
      );
    });

    it("Should emit a Transfer event on successful transfer", async function () {
      const amount = ethers.utils.parseUnits("500", 18);
      await expect(supCoin.transfer(addr1.address, amount))
        .to.emit(supCoin, "Transfer")
        .withArgs(owner.address, addr1.address, amount);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const amount = ethers.utils.parseUnits("1000000000", 18);
      await expect(
        supCoin.connect(addr1).transfer(owner.address, amount)
      ).to.be.revertedWith("Not enough tokens");
    });

    it("Should allow multiple transfers", async function () {
      const amount1 = ethers.utils.parseUnits("1000", 18);
      const amount2 = ethers.utils.parseUnits("500", 18);

      await supCoin.transfer(addr1.address, amount1);
      await supCoin.connect(addr1).transfer(addr2.address, amount2);

      expect(await supCoin.balanceOf(addr1.address)).to.equal(
        amount1.sub(amount2)
      );
      expect(await supCoin.balanceOf(addr2.address)).to.equal(amount2);
    });
  });

  describe("Balance Queries", function () {
    it("Should return the correct balance of an account", async function () {
      const amount = ethers.utils.parseUnits("2000", 18);
      await supCoin.transfer(addr1.address, amount);

      const balance = await supCoin.balanceOf(addr1.address);
      expect(balance).to.equal(amount);
    });
  });
});
