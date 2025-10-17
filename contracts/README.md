# FluxTrade Smart Contracts

Solidity smart contracts for FluxTrade decentralized exchange.

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your `.env` (optional for local development):

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

### Start Local Blockchain

```bash
npm run node
```

This starts a Hardhat node at `http://127.0.0.1:8545`

### Deploy Contracts

**Local deployment:**

```bash
npm run deploy:localhost
```

**Custom network:**

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## 📂 Project Structure

```
contracts/
├── contracts/
│   ├── FluxTradeExchange.sol  # Main DEX contract
│   └── MockERC20.sol           # Mock token for testing
├── scripts/
│   └── deploy.js               # Deployment script
├── test/
│   └── FluxTradeExchange.test.js  # Contract tests
├── hardhat.config.js           # Hardhat configuration
└── package.json
```

## 📝 Contracts

### FluxTradeExchange

Main decentralized exchange contract with the following features:

**Functions:**

- `swap()` - Swap tokens
- `addLiquidity()` - Add liquidity to trading pairs
- `removeLiquidity()` - Remove liquidity
- `getQuote()` - Get swap quote
- `updateTradingFee()` - Update trading fee (owner only)
- `withdrawFees()` - Withdraw collected fees (owner only)

**Events:**

- `Swap` - Emitted on token swap
- `LiquidityAdded` - Emitted when liquidity is added
- `LiquidityRemoved` - Emitted when liquidity is removed
- `FeeUpdated` - Emitted when trading fee is updated

**Security Features:**

- ReentrancyGuard protection
- Ownable access control
- SafeERC20 token transfers
- Slippage protection

### MockERC20

ERC20 token implementation for testing:

- Standard ERC20 functions
- Mint/burn functions for testing
- Faucet function for getting test tokens
- Configurable decimals

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run with coverage:

```bash
npx hardhat coverage
```

## 🌐 Network Deployment

### Local (Hardhat Network)

```bash
npm run node
# In another terminal:
npm run deploy:localhost
```

### Testnet (e.g., Sepolia)

1. Configure `.env` with private key and RPC URL
2. Deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Mainnet

⚠️ **Warning**: Make sure contracts are audited before mainnet deployment!

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

## 🔍 Verify Contracts

After deployment, verify on Etherscan:

```bash
npx hardhat verify --network <network> <contract-address> <constructor-args>
```

## 📊 Deployment Output

After deployment, contract addresses are saved to:

```
../frontend/src/contracts/deployments.json
```

This file contains:

- Exchange contract address
- Mock token addresses (USDC, DAI, WBTC)
- Network information

## 🛠️ Technologies

- **Solidity 0.8.20**: Smart contract language
- **Hardhat**: Development environment
- **OpenZeppelin**: Secure contract libraries
- **ethers.js**: Ethereum library
- **Chai**: Testing framework

## 🔒 Security

- Uses OpenZeppelin's audited contracts
- ReentrancyGuard for preventing reentrancy attacks
- SafeERC20 for safe token transfers
- Access control with Ownable pattern
- Comprehensive test coverage

## 📚 Learn More

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)

## ⚠️ Disclaimer

These contracts are for educational purposes. They should be thoroughly audited before use in production. The simplified AMM implementation should be replaced with a proper AMM formula (like Uniswap V2/V3) for production use.
