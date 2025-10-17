# FluxTrade - Decentralized Crypto Trading Platform

A modern decentralized trading application built with the MERN stack, Solidity smart contracts, and ethers.js.

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + ethers.js
- **Backend**: Node.js + Express + MongoDB
- **Smart Contracts**: Solidity + Hardhat + OpenZeppelin
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
FluxTrade/
├── frontend/          # React frontend application
├── backend/           # Express API server
├── contracts/         # Solidity smart contracts
└── README.md         # Project documentation
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- MetaMask browser extension

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB URI and other environment variables
npm run dev
```

The backend will run on `http://localhost:5000`

### Contracts Setup

```bash
cd contracts
npm install
cp .env.example .env
# Add your private key and network RPC URLs
npx hardhat compile
npx hardhat test
```

## 🎨 Features

- 🔐 MetaMask wallet connection
- 💱 Token swap interface
- 📊 Trade dashboard with real-time data
- 🌙 Dark mode with futuristic UI
- ✨ Glassmorphism effects and neon gradients
- 🔒 Secure smart contract interactions

## 🚧 Development

This is a scaffold project ready for extension. Use GitHub Copilot to:
- Add detailed trading logic
- Implement smart contract functions
- Add animations and transitions
- Integrate real-time price feeds
- Add more DeFi features

## 📝 License

MIT

---

Built with ❤️ using MERN + Web3
