# FluxTrade Backend

Express.js + MongoDB backend API for FluxTrade.

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

Configure your `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fluxtrade
NODE_ENV=development
JWT_SECRET=your_secret_here
ETHEREUM_RPC_URL=http://127.0.0.1:8545
```

### Start MongoDB

Make sure MongoDB is running:

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
```

### Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Production Server

```bash
npm start
```

## 📂 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── tradeController.js # Trade logic
│   ├── userController.js  # User management
│   └── tokenController.js # Token management
├── middleware/
│   ├── errorHandler.js    # Error handling
│   └── rateLimiter.js     # Rate limiting
├── models/
│   ├── Trade.js           # Trade schema
│   ├── User.js            # User schema
│   └── Token.js           # Token schema
├── routes/
│   ├── tradeRoutes.js     # Trade endpoints
│   ├── userRoutes.js      # User endpoints
│   └── tokenRoutes.js     # Token endpoints
├── server.js              # Main server file
└── package.json
```

## 🔌 API Endpoints

### Health Check

```
GET /api/health
```

### Trades

```
GET    /api/trades                      # Get all trades
GET    /api/trades/:id                  # Get trade by ID
POST   /api/trades                      # Create new trade
GET    /api/trades/user/:walletAddress  # Get user trades
```

### Users

```
GET    /api/users/:walletAddress        # Get user
POST   /api/users                       # Create user
PUT    /api/users/:walletAddress        # Update user
GET    /api/users/:walletAddress/stats  # Get user stats
```

### Tokens

```
GET    /api/tokens                      # Get all tokens
GET    /api/tokens/:symbol              # Get token by symbol
POST   /api/tokens                      # Add new token
PUT    /api/tokens/:symbol/price        # Update token price
```

## 📝 Example Requests

### Create a Trade

```bash
curl -X POST http://localhost:5000/api/trades \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x123...",
    "fromToken": "ETH",
    "toToken": "USDC",
    "fromAmount": "1.0",
    "toAmount": "1850.0",
    "exchangeRate": "1850.0",
    "transactionHash": "0xabc...",
    "status": "completed"
  }'
```

### Get User Trades

```bash
curl http://localhost:5000/api/trades/user/0x123...
```

## 🛠️ Technologies

- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger
- **Rate Limiting**: API rate limiting

## 🔒 Security Features

- Helmet for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation
- Error handling

## 📊 Database Models

### Trade

- Wallet address
- Token information (from/to)
- Amounts and exchange rate
- Transaction hash
- Status (pending/completed/failed)
- Timestamps

### User

- Wallet address
- Optional email/username
- Trade statistics
- Preferences (slippage, gas price)
- Activity status

### Token

- Symbol and name
- Contract address
- Decimals
- Price data (current, 24h change)
- Market data (volume, market cap)

## 🧪 Testing

```bash
npm test
```

## 📝 Code Quality

```bash
npm run lint
npm run format
```
