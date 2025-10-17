# 🚀 FluxTrade Setup Guide

Complete guide to get FluxTrade up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Community Edition) - [Download](https://www.mongodb.com/try/download/community)
- **MetaMask** browser extension - [Install](https://metamask.io/)
- **Git** - [Download](https://git-scm.com/)

## 📦 Installation Steps

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Backend Setup

```bash
# Open a new terminal
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Make sure MongoDB is running
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 3. Smart Contracts Setup

```bash
# Open a new terminal
cd contracts

# Install dependencies
npm install

# Optional: Create environment file for testnet deployment
cp .env.example .env

# Compile contracts
npm run compile

# Run tests
npm test

# Start local Hardhat node
npm run node
```

This starts a local blockchain at `http://127.0.0.1:8545`

### 4. Deploy Contracts

```bash
# In a new terminal (keep Hardhat node running)
cd contracts

# Deploy to local network
npm run deploy:localhost
```

This will:
- Deploy FluxTradeExchange contract
- Deploy mock tokens (USDC, DAI, WBTC)
- Save addresses to `frontend/src/contracts/deployments.json`

### 5. Configure MetaMask

1. Open MetaMask
2. Click on network dropdown → Add Network → Add a network manually
3. Fill in:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH
4. Click "Save"

5. Import test account:
   - Click on account icon → Import Account
   - Copy private key from Hardhat node console
   - Paste and import

## 🎯 Quick Start Commands

Once everything is set up, use these commands in separate terminals:

### Terminal 1 - Hardhat Node
```bash
cd contracts && npm run node
```

### Terminal 2 - Backend
```bash
cd backend && npm run dev
```

### Terminal 3 - Frontend
```bash
cd frontend && npm run dev
```

### Terminal 4 - Deploy Contracts (first time only)
```bash
cd contracts && npm run deploy:localhost
```

## ✅ Verify Installation

1. **Frontend**: Open `http://localhost:5173` - you should see the FluxTrade UI
2. **Backend**: Open `http://localhost:5000/api/health` - you should see a success message
3. **Contracts**: Check that `frontend/src/contracts/deployments.json` has contract addresses
4. **MetaMask**: Click "Connect Wallet" and approve the connection

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error**: "MongoDB connection failed"

**Solution**:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Check if MongoDB is running
mongosh
```

### Port Already in Use

**Error**: "Port 5173/5000 is already in use"

**Solution**:
```bash
# Find and kill the process
# macOS/Linux
lsof -ti:5173 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### MetaMask Connection Issues

**Error**: "User rejected the request"

**Solution**:
- Make sure MetaMask is unlocked
- Switch to the Hardhat Local network
- Try refreshing the page

### Contract Deployment Failed

**Error**: "Error deploying contracts"

**Solution**:
1. Make sure Hardhat node is running
2. Clear artifacts: `cd contracts && npx hardhat clean`
3. Recompile: `npm run compile`
4. Try deploying again: `npm run deploy:localhost`

### Frontend Not Connecting to Wallet

**Solution**:
1. Make sure MetaMask is installed
2. Switch to Hardhat Local network (Chain ID: 31337)
3. Refresh the page
4. Try connecting again

## 📝 Development Workflow

### Making Changes

1. **Frontend Changes**: 
   - Edit files in `frontend/src/`
   - Vite will hot-reload automatically

2. **Backend Changes**: 
   - Edit files in `backend/`
   - Nodemon will restart the server automatically

3. **Contract Changes**: 
   - Edit contracts in `contracts/contracts/`
   - Run `npm run compile`
   - Deploy again: `npm run deploy:localhost`

### Testing

```bash
# Frontend
cd frontend && npm run lint

# Backend (add tests as needed)
cd backend && npm test

# Contracts
cd contracts && npm test
```

## 🌐 Deploying to Testnet

### 1. Get Testnet ETH

- **Sepolia**: [Sepolia Faucet](https://sepoliafaucet.com/)
- **Goerli**: [Goerli Faucet](https://goerlifaucet.com/)

### 2. Configure Environment

```bash
cd contracts
# Edit .env file with your private key and Infura/Alchemy URL
```

### 3. Deploy

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Update Frontend

Update `frontend/.env`:
```env
VITE_CHAIN_ID=11155111  # Sepolia
VITE_CONTRACT_ADDRESS=<deployed_address>
```

## 🎨 Customization

### Change Theme Colors

Edit `frontend/tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#your-color',
  },
  // ... more colors
}
```

### Add New Routes

1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`:

```jsx
<Route path="/your-route" element={<YourComponent />} />
```

### Add API Endpoints

1. Create controller in `backend/controllers/`
2. Create route in `backend/routes/`
3. Register in `backend/server.js`

## 📚 Next Steps

Now that FluxTrade is running, you can:

1. **Connect your wallet** and explore the UI
2. **Test token swaps** with mock tokens
3. **Extend functionality** using GitHub Copilot
4. **Add more features**:
   - Price charts
   - Order book
   - Liquidity pools interface
   - Yield farming
   - Governance features

## 🆘 Need Help?

- Check the README files in each directory
- Review the code comments
- Use GitHub Copilot for code suggestions
- Check Hardhat/ethers.js documentation

## 🎉 You're All Set!

Your FluxTrade development environment is ready. Start building amazing DeFi features!
