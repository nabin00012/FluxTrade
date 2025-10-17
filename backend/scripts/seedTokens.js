import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Token from '../models/Token.js';
import connectDB from '../config/db.js';

dotenv.config();

const tokens = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    contractAddress: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    currentPrice: '1850.00',
    isActive: true,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    contractAddress: '0xA0b86a33E6441e88C5F2712C3E9b74F5c4d6E3E7',
    decimals: 6,
    logoUrl: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    currentPrice: '1.00',
    isActive: true,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    logoUrl: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
    currentPrice: '1.00',
    isActive: true,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
    logoUrl: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
    currentPrice: '43250.00',
    isActive: true,
  },
];

const seedTokens = async () => {
  try {
    await connectDB();

    // Clear existing tokens
    await Token.deleteMany({});
    console.log('🧹 Cleared existing tokens');

    // Insert new tokens
    await Token.insertMany(tokens);
    console.log('✅ Seeded tokens successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding tokens:', error);
    process.exit(1);
  }
};

seedTokens();