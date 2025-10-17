#!/bin/bash

# FluxTrade Quick Start Script
# This script helps you get FluxTrade running quickly

echo "🚀 FluxTrade Quick Start"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ] || [ ! -d "contracts" ]; then
    echo "❌ Error: Please run this script from the FluxTrade root directory"
    exit 1
fi

echo "${BLUE}Step 1: Installing Dependencies${NC}"
echo "This may take a few minutes..."
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd ../backend && npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install contracts dependencies
echo "📦 Installing contracts dependencies..."
cd ../contracts && npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Contracts dependencies installed"
else
    echo "❌ Failed to install contracts dependencies"
    exit 1
fi

cd ..

echo ""
echo "${BLUE}Step 2: Setting up Environment Files${NC}"
echo ""

# Create .env files
if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✓${NC} Frontend .env created"
else
    echo -e "${YELLOW}⚠${NC} Frontend .env already exists"
fi

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓${NC} Backend .env created"
else
    echo -e "${YELLOW}⚠${NC} Backend .env already exists"
fi

echo ""
echo "${BLUE}Step 3: Compiling Smart Contracts${NC}"
echo ""

cd contracts
npm run compile
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Contracts compiled successfully"
else
    echo "❌ Failed to compile contracts"
fi
cd ..

echo ""
echo "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "========================"
echo "🎉 FluxTrade is Ready!"
echo "========================"
echo ""
echo "Next Steps:"
echo ""
echo "1. Make sure MongoDB is running:"
echo "   ${YELLOW}brew services start mongodb-community${NC}"
echo ""
echo "2. Open 4 terminal windows/tabs and run:"
echo ""
echo "   Terminal 1 - Hardhat Node:"
echo "   ${BLUE}cd contracts && npm run node${NC}"
echo ""
echo "   Terminal 2 - Deploy Contracts (after Hardhat node is running):"
echo "   ${BLUE}cd contracts && npm run deploy:localhost${NC}"
echo ""
echo "   Terminal 3 - Backend Server:"
echo "   ${BLUE}cd backend && npm run dev${NC}"
echo ""
echo "   Terminal 4 - Frontend Server:"
echo "   ${BLUE}cd frontend && npm run dev${NC}"
echo ""
echo "3. Open your browser to:"
echo "   ${BLUE}http://localhost:5173${NC}"
echo ""
echo "4. Connect MetaMask with Hardhat Local network:"
echo "   Network Name: Hardhat Local"
echo "   RPC URL: http://127.0.0.1:8545"
echo "   Chain ID: 31337"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - QUICKSTART.md - Quick commands"
echo "   - SETUP.md - Detailed setup guide"
echo "   - README.md - Project overview"
echo ""
echo "Happy coding! 🚀"
