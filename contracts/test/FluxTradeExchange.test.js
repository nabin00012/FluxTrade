const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FluxTradeExchange", function () {
  let exchange, token1, token2;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy mock tokens
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    token1 = await MockERC20.deploy("Token1", "TK1", 18);
    token2 = await MockERC20.deploy("Token2", "TK2", 18);

    // Deploy exchange
    const FluxTradeExchange = await ethers.getContractFactory("FluxTradeExchange");
    exchange = await FluxTradeExchange.deploy();

    // Mint tokens to users
    await token1.mint(user1.address, ethers.parseEther("1000"));
    await token2.mint(user1.address, ethers.parseEther("1000"));
    await token1.mint(exchange.getAddress(), ethers.parseEther("10000"));
    await token2.mint(exchange.getAddress(), ethers.parseEther("10000"));
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await exchange.owner()).to.equal(owner.address);
    });

    it("Should set default trading fee", async function () {
      expect(await exchange.tradingFee()).to.equal(30); // 0.3%
    });
  });

  describe("Swapping", function () {
    it("Should allow token swap", async function () {
      const amountIn = ethers.parseEther("100");
      
      // Approve exchange to spend tokens
      await token1.connect(user1).approve(exchange.getAddress(), amountIn);

      // Perform swap
      const tx = await exchange.connect(user1).swap(
        token1.getAddress(),
        token2.getAddress(),
        amountIn,
        0
      );

      expect(tx).to.emit(exchange, "Swap");
    });

    it("Should revert swap with same token", async function () {
      const amountIn = ethers.parseEther("100");
      await token1.connect(user1).approve(exchange.getAddress(), amountIn);

      await expect(
        exchange.connect(user1).swap(
          token1.getAddress(),
          token1.getAddress(),
          amountIn,
          0
        )
      ).to.be.revertedWith("Cannot swap same token");
    });
  });

  describe("Liquidity", function () {
    it("Should allow adding liquidity", async function () {
      const amount1 = ethers.parseEther("100");
      const amount2 = ethers.parseEther("100");

      await token1.connect(user1).approve(exchange.getAddress(), amount1);
      await token2.connect(user1).approve(exchange.getAddress(), amount2);

      await expect(
        exchange.connect(user1).addLiquidity(
          token1.getAddress(),
          token2.getAddress(),
          amount1,
          amount2
        )
      ).to.emit(exchange, "LiquidityAdded");
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to update trading fee", async function () {
      const newFee = 50; // 0.5%
      await exchange.updateTradingFee(newFee);
      expect(await exchange.tradingFee()).to.equal(newFee);
    });

    it("Should revert if non-owner tries to update fee", async function () {
      await expect(
        exchange.connect(user1).updateTradingFee(50)
      ).to.be.revertedWithCustomError(exchange, "OwnableUnauthorizedAccount");
    });
  });
});
