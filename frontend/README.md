# FluxTrade Frontend

React + Vite + Tailwind CSS frontend for FluxTrade decentralized trading platform.

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Update `.env` with your configuration:
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)
- `VITE_CHAIN_ID`: Blockchain network chain ID (31337 for Hardhat)
- `VITE_CONTRACT_ADDRESS`: Deployed exchange contract address

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📂 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── WalletConnect.jsx
│   │   ├── TradeDashboard.jsx
│   │   ├── TokenSwap.jsx
│   │   └── Footer.jsx
│   ├── context/         # React context providers
│   │   └── WalletContext.jsx
│   ├── contracts/       # Contract ABIs and addresses
│   │   ├── abis.js
│   │   └── deployments.json
│   ├── pages/           # Page components
│   │   └── Home.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Features

- **MetaMask Integration**: Seamless wallet connection
- **Token Swapping**: Intuitive swap interface
- **Trade Dashboard**: Real-time trading data
- **Dark Mode UI**: Futuristic design with glassmorphism
- **Responsive**: Mobile-friendly design

## 🛠️ Technologies

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **ethers.js**: Ethereum library for Web3 interactions
- **React Router**: Client-side routing

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## 🔗 Integration

Make sure the backend API and smart contracts are deployed and running:

1. Backend API at `http://localhost:5000`
2. Hardhat node at `http://127.0.0.1:8545`
3. Update contract addresses in `src/contracts/deployments.json`

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ethers.js](https://docs.ethers.org/)
