const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy FluxTradeExchange
  console.log("\n📦 Deploying FluxTradeExchange...");
  const FluxTradeExchange = await hre.ethers.getContractFactory("FluxTradeExchange");
  const exchange = await FluxTradeExchange.deploy();
  await exchange.waitForDeployment();
  const exchangeAddress = await exchange.getAddress();
  console.log("✅ FluxTradeExchange deployed to:", exchangeAddress);

  // Deploy Mock Tokens for testing
  console.log("\n📦 Deploying Mock Tokens...");
  
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  
  const usdc = await MockERC20.deploy("USD Coin", "USDC", 6);
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();
  console.log("✅ USDC deployed to:", usdcAddress);

  const dai = await MockERC20.deploy("Dai Stablecoin", "DAI", 18);
  await dai.waitForDeployment();
  const daiAddress = await dai.getAddress();
  console.log("✅ DAI deployed to:", daiAddress);

  const wbtc = await MockERC20.deploy("Wrapped Bitcoin", "WBTC", 8);
  await wbtc.waitForDeployment();
  const wbtcAddress = await wbtc.getAddress();
  console.log("✅ WBTC deployed to:", wbtcAddress);

  // Mint initial supply to deployer for testing
  console.log("\n💰 Minting test tokens...");
  await usdc.mint(deployer.address, hre.ethers.parseUnits("1000000", 6));
  await dai.mint(deployer.address, hre.ethers.parseUnits("1000000", 18));
  await wbtc.mint(deployer.address, hre.ethers.parseUnits("100", 8));
  console.log("✅ Test tokens minted");

  // Save deployment addresses
  console.log("\n📝 Deployment Summary:");
  console.log("========================");
  console.log("FluxTradeExchange:", exchangeAddress);
  console.log("USDC:", usdcAddress);
  console.log("DAI:", daiAddress);
  console.log("WBTC:", wbtcAddress);
  console.log("========================\n");

  // Save to file for frontend
  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    exchangeAddress: exchangeAddress,
    tokens: {
      USDC: usdcAddress,
      DAI: daiAddress,
      WBTC: wbtcAddress,
    },
  };

  fs.writeFileSync(
    "../frontend/src/contracts/deployments.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("✅ Deployment info saved to frontend/src/contracts/deployments.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
