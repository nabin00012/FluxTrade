# 📋 FluxTrade Quick Reference

## 🎯 One-Command Setup (After Prerequisites)

```bash
# Terminal 1 - Install all dependencies
cd /Users/nabinchapagain/Desktop/FluxTrade/frontend && npm install &
cd /Users/nabinchapagain/Desktop/FluxTrade/backend && npm install &
cd /Users/nabinchapagain/Desktop/FluxTrade/contracts && npm install &
wait

# Terminal 1 - Start Hardhat Node
cd /Users/nabinchapagain/Desktop/FluxTrade/contracts && npm run node
```

```bash
# Terminal 2 - Deploy Contracts (after Hardhat node is running)
cd /Users/nabinchapagain/Desktop/FluxTrade/contracts && npm run deploy:localhost
```

```bash
# Terminal 3 - Start Backend
cd /Users/nabinchapagain/Desktop/FluxTrade/backend && npm run dev
```

```bash
# Terminal 4 - Start Frontend
cd /Users/nabinchapagain/Desktop/FluxTrade/frontend && npm run dev
```

## 📁 Project Structure

```
FluxTrade/
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/      # UI Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── WalletConnect.jsx
│   │   │   ├── TradeDashboard.jsx
│   │   │   ├── TokenSwap.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/         # React Context
│   │   │   └── WalletContext.jsx
│   │   ├── contracts/       # ABIs & Addresses
│   │   ├── pages/           # Page Components
│   │   └── App.jsx
│   └── package.json
│
├── backend/                  # Node.js + Express + MongoDB
│   ├── config/              # Database config
│   ├── controllers/         # Business logic
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   └── server.js
│
├── contracts/               # Solidity + Hardhat
│   ├── contracts/          # Smart contracts
│   │   ├── FluxTradeExchange.sol
│   │   └── MockERC20.sol
│   ├── scripts/            # Deployment scripts
│   ├── test/               # Contract tests
│   └── hardhat.config.js
│
├── README.md               # Main documentation
├── SETUP.md               # Setup guide
└── .gitignore
```

## 🔗 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React UI |
| Backend API | http://localhost:5000 | Express API |
| API Health | http://localhost:5000/api/health | Health check |
| Hardhat Node | http://127.0.0.1:8545 | Local blockchain |
| MongoDB | mongodb://localhost:27017 | Database |

## 🎨 Key Features

### Frontend
- ✅ MetaMask wallet integration
- ✅ Token swap interface
- ✅ Trade dashboard with stats
- ✅ Dark mode with glassmorphism
- ✅ Responsive design
- ✅ Neon gradients & animations

### Backend
- ✅ RESTful API
- ✅ MongoDB integration
- ✅ Trade tracking
- ✅ User management
- ✅ Token price data
- ✅ Rate limiting & security

### Smart Contracts
- ✅ Token swap functionality
- ✅ Liquidity management
- ✅ Fee collection
- ✅ OpenZeppelin security
- ✅ Test coverage
- ✅ Mock tokens for testing

## 🛠️ Common Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

### Contracts
```bash
npm run compile         # Compile contracts
npm test               # Run tests
npm run node           # Start Hardhat node
npm run deploy:localhost # Deploy to localhost
npx hardhat clean      # Clean artifacts
```

## 🔌 API Endpoints

### Trades
- `GET /api/trades` - Get all trades
- `GET /api/trades/:id` - Get trade by ID
- `POST /api/trades` - Create new trade
- `GET /api/trades/user/:address` - Get user trades

### Users
- `GET /api/users/:address` - Get user
- `POST /api/users` - Create user
- `PUT /api/users/:address` - Update user
- `GET /api/users/:address/stats` - Get user stats

### Tokens
- `GET /api/tokens` - Get all tokens
- `GET /api/tokens/:symbol` - Get token by symbol
- `POST /api/tokens` - Add new token
- `PUT /api/tokens/:symbol/price` - Update price

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Wallet** | ethers.js v6, MetaMask |
| **Backend** | Node.js, Express, MongoDB |
| **Contracts** | Solidity 0.8.20, Hardhat |
| **Libraries** | OpenZeppelin, Mongoose |
| **Code Quality** | ESLint, Prettier |

## 🎯 MetaMask Configuration

**Network Settings:**
- Network Name: Hardhat Local
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency: ETH

## 🚀 Extending FluxTrade

### Add New Component
```bash
cd frontend/src/components
# Create YourComponent.jsx
# Import in parent component
```

### Add New API Endpoint
```bash
cd backend
# 1. Create controller in controllers/
# 2. Create route in routes/
# 3. Register in server.js
```

### Add New Smart Contract
```bash
cd contracts/contracts
# 1. Create YourContract.sol
# 2. Update deploy.js
# 3. Add tests in test/
# 4. Compile & deploy
```

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Kill process: `lsof -ti:PORT \| xargs kill -9` |
| MongoDB not running | `brew services start mongodb-community` |
| MetaMask won't connect | Check network (Chain ID: 31337) |
| Contracts not deploying | Clean & recompile: `npx hardhat clean && npm run compile` |
| Frontend not loading | Check all services are running |

## 📚 Documentation

- Main README: `README.md`
- Setup Guide: `SETUP.md`
- Frontend: `frontend/README.md`
- Backend: `backend/README.md`
- Contracts: `contracts/README.md`

## 🎨 Customization Tips

### Change Colors
Edit `frontend/tailwind.config.js` → `theme.extend.colors`

### Modify Trading Fee
Edit `contracts/contracts/FluxTradeExchange.sol` → `tradingFee` variable

### Add New Token
Use the API: `POST /api/tokens` with token details

### Change Slippage
Edit `frontend/src/components/TokenSwap.jsx` → slippage value

## ✨ Next Steps

1. **Explore the UI** - Connect wallet and test swaps
2. **Read the code** - Well-commented and modular
3. **Use Copilot** - Get suggestions for new features
4. **Extend features**:
   - Add price charts (TradingView)
   - Implement real AMM formula
   - Add liquidity pool interface
   - Create governance tokens
   - Build analytics dashboard

## 🎉 Ready to Build!

FluxTrade is your complete DeFi scaffold. Use GitHub Copilot to extend it with advanced features!
