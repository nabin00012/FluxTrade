#!/bin/bash

# FluxTrade Setup Verification Script
# This script helps verify your development environment

echo "🔍 FluxTrade Setup Verification"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js is installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js is not installed"
    echo "  Please install from https://nodejs.org/"
fi
echo ""

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm is installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm is not installed"
fi
echo ""

# Check MongoDB
echo "Checking MongoDB..."
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -n 1)
    echo -e "${GREEN}✓${NC} MongoDB is installed"
    
    # Check if MongoDB is running
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✓${NC} MongoDB is running"
    else
        echo -e "${YELLOW}⚠${NC} MongoDB is installed but not running"
        echo "  Start it with: brew services start mongodb-community"
    fi
else
    echo -e "${RED}✗${NC} MongoDB is not installed"
    echo "  Install with: brew install mongodb-community"
fi
echo ""

# Check Git
echo "Checking Git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓${NC} Git is installed: $GIT_VERSION"
else
    echo -e "${RED}✗${NC} Git is not installed"
fi
echo ""

# Check project structure
echo "Checking project structure..."
if [ -d "frontend" ] && [ -d "backend" ] && [ -d "contracts" ]; then
    echo -e "${GREEN}✓${NC} All main directories exist"
else
    echo -e "${RED}✗${NC} Project structure is incomplete"
fi
echo ""

# Check if dependencies are installed
echo "Checking dependencies..."

if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Frontend dependencies not installed"
    echo "  Run: cd frontend && npm install"
fi

if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Backend dependencies not installed"
    echo "  Run: cd backend && npm install"
fi

if [ -d "contracts/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Contracts dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Contracts dependencies not installed"
    echo "  Run: cd contracts && npm install"
fi
echo ""

# Check environment files
echo "Checking environment files..."

if [ -f "frontend/.env" ]; then
    echo -e "${GREEN}✓${NC} Frontend .env exists"
else
    echo -e "${YELLOW}⚠${NC} Frontend .env not found"
    echo "  Create it: cd frontend && cp .env.example .env"
fi

if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} Backend .env exists"
else
    echo -e "${YELLOW}⚠${NC} Backend .env not found"
    echo "  Create it: cd backend && cp .env.example .env"
fi

if [ -f "contracts/.env" ]; then
    echo -e "${GREEN}✓${NC} Contracts .env exists"
else
    echo -e "${YELLOW}⚠${NC} Contracts .env not found (optional for local dev)"
fi
echo ""

# Check ports
echo "Checking if ports are available..."

if ! lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 5173 (Frontend) is available"
else
    echo -e "${YELLOW}⚠${NC} Port 5173 is in use"
fi

if ! lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 5000 (Backend) is available"
else
    echo -e "${YELLOW}⚠${NC} Port 5000 is in use"
fi

if ! lsof -Pi :8545 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Port 8545 (Hardhat) is available"
else
    echo -e "${YELLOW}⚠${NC} Port 8545 is in use"
fi
echo ""

# Summary
echo "================================"
echo "Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Install any missing prerequisites"
echo "2. Install dependencies if not already installed"
echo "3. Follow SETUP.md for detailed instructions"
echo "4. Use QUICKSTART.md for quick commands"
echo ""
echo "Happy coding! 🚀"
