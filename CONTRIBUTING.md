# 🤝 Contributing to FluxTrade

Thank you for your interest in contributing to FluxTrade! This guide will help you get started.

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Feature Requests](#feature-requests)

## 🎯 Code of Conduct

- Be respectful and inclusive
- Write clean, maintainable code
- Document your changes
- Test thoroughly before submitting
- Follow the project's coding standards

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
git clone https://github.com/yourusername/FluxTrade.git
cd FluxTrade
```

### 2. Set Up Environment

```bash
# Install all dependencies
npm run install:all

# Copy environment files
cd frontend && cp .env.example .env
cd ../backend && cp .env.example .env
cd ../contracts && cp .env.example .env
```

### 3. Create a Branch

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

## 🔄 Development Workflow

### Branch Naming Convention

- Features: `feature/description`
- Bug Fixes: `fix/description`
- Improvements: `improve/description`
- Documentation: `docs/description`

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add price chart component

Added TradingView widget integration for displaying
real-time price charts on token swap page.

Closes #123
```

```
fix: resolve wallet connection issue

Fixed MetaMask connection bug that occurred when
switching networks rapidly.

Fixes #456
```

## 📝 Coding Standards

### Frontend (React)

```javascript
// Use functional components with hooks
const MyComponent = () => {
  const [state, setState] = useState(null);
  
  // Group hooks together
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Handler functions
  const handleClick = () => {
    // Logic
  };
  
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

**Best Practices:**
- Use descriptive variable names
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use PropTypes or TypeScript for type checking
- Follow React best practices

### Backend (Node.js/Express)

```javascript
// Use async/await for asynchronous operations
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
```

**Best Practices:**
- Always handle errors
- Use try-catch blocks
- Validate input
- Use proper HTTP status codes
- Document API endpoints

### Smart Contracts (Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MyContract
 * @dev Description of what this contract does
 */
contract MyContract {
    // State variables
    uint256 public value;
    
    // Events
    event ValueUpdated(uint256 oldValue, uint256 newValue);
    
    /**
     * @dev Update the value
     * @param newValue The new value to set
     */
    function updateValue(uint256 newValue) external {
        uint256 oldValue = value;
        value = newValue;
        emit ValueUpdated(oldValue, newValue);
    }
}
```

**Best Practices:**
- Use latest Solidity version
- Follow OpenZeppelin patterns
- Add comprehensive comments
- Emit events for state changes
- Include security checks

## 🧪 Testing Guidelines

### Frontend Tests

```javascript
// Component test example
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Backend Tests

```javascript
// API test example
import request from 'supertest';
import app from '../server';

describe('GET /api/items', () => {
  it('should return all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
```

### Smart Contract Tests

```javascript
// Contract test example
const { expect } = require("chai");

describe("MyContract", function () {
  it("Should update value", async function () {
    const MyContract = await ethers.getContractFactory("MyContract");
    const contract = await MyContract.deploy();
    
    await contract.updateValue(42);
    expect(await contract.value()).to.equal(42);
  });
});
```

## 🔍 Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console.logs left in code
- [ ] Environment variables used for sensitive data
- [ ] Error handling implemented
- [ ] Code is well-commented
- [ ] No breaking changes (or documented)
- [ ] Performance considered

## 📬 Pull Request Process

### 1. Update Your Branch

```bash
# Fetch latest changes
git fetch upstream
git merge upstream/main

# Or rebase
git rebase upstream/main
```

### 2. Run Tests

```bash
# Frontend
cd frontend && npm run lint

# Backend
cd backend && npm run lint

# Contracts
cd contracts && npm test
```

### 3. Push Changes

```bash
git push origin feature/your-feature-name
```

### 4. Create Pull Request

- Go to GitHub and create a PR
- Fill in the PR template
- Link related issues
- Request review from maintainers

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added
- [ ] Manual testing done

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #123
```

## 💡 Feature Requests

### Suggesting Features

1. Check if feature already requested
2. Open a new issue with label `enhancement`
3. Describe the feature clearly
4. Explain use case and benefits
5. Provide examples if possible

### Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Screenshots, mockups, etc.
```

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g., macOS]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other context about the problem
```

## 📚 Documentation

### Updating Documentation

- Keep README files up to date
- Update API documentation
- Add JSDoc comments to functions
- Update ROADMAP.md for new features
- Include examples where helpful

### Documentation Style

```javascript
/**
 * Swaps tokens using the exchange contract
 * 
 * @param {string} tokenIn - Input token address
 * @param {string} tokenOut - Output token address
 * @param {string} amountIn - Amount of input tokens
 * @param {string} minAmountOut - Minimum output amount
 * @returns {Promise<Object>} Transaction receipt
 * @throws {Error} If swap fails
 * 
 * @example
 * const receipt = await swapTokens(
 *   '0x123...',
 *   '0x456...',
 *   '1000000',
 *   '990000'
 * );
 */
async function swapTokens(tokenIn, tokenOut, amountIn, minAmountOut) {
  // Implementation
}
```

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation
- Part of the FluxTrade community!

## 📞 Getting Help

- Check existing documentation
- Search closed issues
- Ask in discussions
- Join community chat
- Contact maintainers

## 🎯 Good First Issues

Look for issues labeled:
- `good first issue` - Great for newcomers
- `help wanted` - Community help needed
- `documentation` - Documentation improvements

## 📖 Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Hardhat Guides](https://hardhat.org/docs)
- [ethers.js Docs](https://docs.ethers.org/)

## 🙏 Thank You!

Every contribution matters, whether it's:
- Code improvements
- Bug reports
- Documentation
- Feature ideas
- Testing
- Feedback

Thank you for making FluxTrade better! 🚀

---

**Questions?** Open an issue or reach out to maintainers.
