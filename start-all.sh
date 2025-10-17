#!/bin/bash

echo "🚀 Starting FluxTrade Local Development Environment"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kill existing processes
echo -e "${YELLOW}Cleaning up existing processes...${NC}"
pkill -f "hardhat node" 2>/dev/null
pkill -f "node server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

# Start Hardhat Node in background
echo -e "${GREEN}✓ Starting Hardhat Blockchain...${NC}"
cd contracts
npx hardhat node > hardhat.log 2>&1 &
HARDHAT_PID=$!
echo "  → Running on http://127.0.0.1:8545 (PID: $HARDHAT_PID)"
sleep 5

# Deploy contracts
echo -e "${GREEN}✓ Deploying Smart Contracts...${NC}"
npx hardhat run scripts/deploy.js --network localhost
cd ..

# Start Backend
echo -e "${GREEN}✓ Starting Backend Server...${NC}"
cd backend
node server.js > backend.log 2>&1 &
BACKEND_PID=$!
echo "  → Running on http://localhost:5000 (PID: $BACKEND_PID)"
sleep 3
cd ..

# Start Frontend
echo -e "${GREEN}✓ Starting Frontend...${NC}"
cd frontend
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "  → Running on http://localhost:5173 (PID: $FRONTEND_PID)"
cd ..

echo ""
echo "=================================================="
echo -e "${GREEN}✅ FluxTrade is running!${NC}"
echo "=================================================="
echo ""
echo "📱 Frontend:    http://localhost:5173"
echo "🔧 Backend:     http://localhost:5000"
echo "⛓️  Blockchain:  http://127.0.0.1:8545"
echo ""
echo "📝 Logs:"
echo "   Backend:    tail -f backend/backend.log"
echo "   Frontend:   tail -f frontend/frontend.log"
echo "   Blockchain: tail -f contracts/hardhat.log"
echo ""
echo "🛑 To stop all services: pkill -f 'hardhat node|node server.js|vite'"
echo ""
