import { useState, useEffect } from 'react';
import { FaExchangeAlt, FaChevronDown, FaChevronLeft, FaInfoCircle, FaGasPump, FaClock } from 'react-icons/fa';
import { useWallet } from '../context/WalletContext';
import { ethers } from 'ethers';
import deployments from '../contracts/deployments.json';
import exchangeABI from '../contracts/abis/FluxTradeExchange.json';
import tokenABI from '../contracts/abis/ERC20.json';
import { getTokenPrices } from '../utils/priceFeeds';

const TokenSwap = () => {
  const { account, signer, provider } = useWallet();
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isLoading, setIsLoading] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState('demo'); // Default to demo mode
  const [exchangeContract, setExchangeContract] = useState(null);
  const [tokenContracts, setTokenContracts] = useState({});
  const [tokenPrices, setTokenPrices] = useState({});
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromPlacement, setFromPlacement] = useState('right'); // 'left' | 'right'
  const [toPlacement, setToPlacement] = useState('right');
  const fromSelectorRef = useRef(null);
  const toSelectorRef = useRef(null);

  // Update network status
  useEffect(() => {
    const updateNetwork = async () => {
      const network = await getCurrentNetwork();
      setCurrentNetwork(network);
    };
    if (provider) {
      updateNetwork();
    }
  }, [provider]);

  // Fetch real token prices
  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getTokenPrices();
      setTokenPrices(prices);
    };
    fetchPrices();

    // Refresh prices every 5 minutes
    const interval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.token-selector')) {
        setShowFromDropdown(false);
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize contracts when wallet is connected
  useEffect(() => {
    if (signer && provider) {
      initializeContracts();
    }
  }, [signer, provider]);

  const initializeContracts = async () => {
    try {
      const currentNetwork = await getCurrentNetwork();
      const networkConfig = deployments[currentNetwork];

      if (!networkConfig || !networkConfig.exchangeAddress) {
        console.warn(`No contracts deployed for network: ${currentNetwork}. Using demo mode.`);
        setExchangeContract(null);
        setTokenContracts({});
        return;
      }

      // Initialize exchange contract
      const exchange = new ethers.Contract(networkConfig.exchangeAddress, exchangeABI, signer);
      setExchangeContract(exchange);

      // Initialize token contracts
      const tokens = {};
      for (const [symbol, address] of Object.entries(networkConfig.tokens)) {
        if (address) {
          tokens[symbol] = new ethers.Contract(address, tokenABI, signer);
        }
      }
      setTokenContracts(tokens);
    } catch (error) {
      console.error('Error initializing contracts:', error);
      setExchangeContract(null);
      setTokenContracts({});
    }
  };

  const getCurrentNetwork = async () => {
    if (!provider) return 'demo';
    try {
      const network = await provider.getNetwork();
      const chainId = network.chainId;

      if (chainId === 31337n) return 'localhost';
      // For all other networks (including mainnet, testnets), use demo mode
      return 'demo';
    } catch (error) {
      console.error('Error getting network:', error);
      return 'demo';
    }
  };

    // Professional token list with real prices
  const getTokenList = () => {
    const currentNetwork = deployments[window.location.hostname === 'localhost' ? 'localhost' : 'demo'];
    return [
      { symbol: 'ETH', name: 'Ethereum', balance: '2.45', price: tokenPrices.ETH?.price || 1850.00, icon: 'Ξ', address: '0x0000000000000000000000000000000000000000' },
      { symbol: 'USDC', name: 'USD Coin', balance: '1,250.00', price: tokenPrices.USDC?.price || 1.00, icon: '💲', address: currentNetwork?.tokens?.USDC || '' },
      { symbol: 'DAI', name: 'Dai', balance: '500.00', price: tokenPrices.DAI?.price || 1.00, icon: '🪙', address: currentNetwork?.tokens?.DAI || '' },
      { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.025', price: tokenPrices.WBTC?.price || 43250.00, icon: '₿', address: currentNetwork?.tokens?.WBTC || '' },
    ];
  };

  const tokens = getTokenList();

  const selectedFromToken = tokens.find(t => t.symbol === fromToken);
  const selectedToToken = tokens.find(t => t.symbol === toToken);

  // Calculate exchange rate (placeholder)
  const exchangeRate = fromToken === 'ETH' && toToken === 'USDC' ? '1,850.00' : '1.00';

  const handleSwap = async () => {
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!fromAmount) {
      alert('Please enter an amount to swap');
      return;
    }

    // Check if contracts are available - allow demo mode
    const isDemoMode = currentNetwork === 'demo' || !exchangeContract;
    if (!exchangeContract && currentNetwork !== 'demo') {
      alert('Smart contracts not available on this network. Switching to demo mode for testing.');
      setCurrentNetwork('demo');
      return;
    }

    setIsLoading(true);
    try {
      // Demo mode - just show success message
      if (isDemoMode) {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create a mock trade record
        const mockTrade = {
          fromToken,
          toToken,
          fromAmount,
          toAmount,
          exchangeRate: (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6),
          walletAddress: account,
          status: 'completed',
          txHash: `demo_${Date.now()}`,
          timestamp: new Date()
        };

        // Try to save to backend (optional)
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/trades`, mockTrade);
        } catch (apiError) {
          console.log('Could not save demo trade to backend, continuing...');
        }

        // Emit a custom event so other components (dashboard) can react
        const event = new CustomEvent('fluxtrade:trade', { detail: mockTrade });
        window.dispatchEvent(event);

        alert(`🎉 Demo Swap Successful!\n\nSwapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}\n\nThis was a demo transaction. Connect to localhost network or deploy contracts to testnet for real swaps.`);

        // Reset form
        setFromAmount('');
        setToAmount('');
        return;
      }

      // Real contract execution
      const fromTokenData = tokens.find(t => t.symbol === fromToken);
      const toTokenData = tokens.find(t => t.symbol === toToken);

      if (!fromTokenData || !toTokenData) {
        throw new Error('Token not found');
      }

      const amountIn = ethers.parseEther(fromAmount);
      const slippagePercent = parseFloat(slippage) / 100;
      const minAmountOut = amountIn * BigInt(Math.floor((1 - slippagePercent) * 100)) / BigInt(100);

      // For ETH swaps
      if (fromToken === 'ETH') {
        const tx = await exchangeContract.swap(
          fromTokenData.address,
          toTokenData.address,
          amountIn,
          minAmountOut,
          { value: amountIn }
        );
        await tx.wait();
        alert('Swap completed successfully!');
      } else {
        // For ERC20 token swaps, need approval first
        const tokenContract = tokenContracts[fromToken];
        if (!tokenContract) {
          throw new Error('Token contract not found');
        }

        // Approve spending
        const approveTx = await tokenContract.approve(deployments.localhost.exchangeAddress, amountIn);
        await approveTx.wait();

        // Perform swap
        const swapTx = await exchangeContract.swap(
          fromTokenData.address,
          toTokenData.address,
          amountIn,
          minAmountOut
        );
        await swapTx.wait();
        alert('Swap completed successfully!');
      }

      // Reset form
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Swap error:', error);
      alert('Swap failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const selectFromToken = (tokenSymbol) => {
    if (tokenSymbol !== toToken) {
      setFromToken(tokenSymbol);
      setShowFromDropdown(false);
      setFromAmount(''); // Reset amount when changing tokens
      setToAmount(''); // Reset output amount
    }
  };

  const selectToToken = (tokenSymbol) => {
    if (tokenSymbol !== fromToken) {
      setToToken(tokenSymbol);
      setShowToDropdown(false);
      setToAmount(''); // Reset output amount
    }
  };

  // Compute placement (left or right) based on available viewport space
  const computePlacement = (buttonRef, setPlacement) => {
    if (!buttonRef?.current) return setPlacement('right');
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = 256; // matches w-64
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;
    // prefer opening toward larger space, but avoid overlapping center
    if (spaceRight < dropdownWidth && spaceLeft > dropdownWidth) {
      setPlacement('left');
    } else {
      setPlacement('right');
    }
  };

  const setMaxAmount = () => {
    if (selectedFromToken) {
      setFromAmount(selectedFromToken.balance);
    }
  };

  return (
    <div className="trading-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Swap Tokens</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              currentNetwork === 'localhost' ? 'bg-green-400' :
              currentNetwork === 'sepolia' ? 'bg-blue-400' : 'bg-yellow-400'
            }`}></div>
            {currentNetwork === 'localhost' ? 'Localhost' :
             currentNetwork === 'sepolia' ? 'Sepolia' : 'Demo Mode'}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FaClock className="mr-1" />
            ~30s
          </div>
        </div>
      </div>

      {/* Live Prices Indicator */}
      <div className="mb-4 flex items-center justify-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Live Prices from CoinGecko
        </div>
      </div>

      {/* Demo Mode Banner */}
      {currentNetwork === 'demo' && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <FaInfoCircle className="mr-2" />
            <span className="text-sm font-medium">Demo Mode Active</span>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
            You're using demo mode. Swaps are simulated and won't execute real transactions.
            Connect to localhost network for real contract testing.
          </p>
        </div>
      )}

      {/* From Token Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Balance: {selectedFromToken?.balance} {fromToken}
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.00"
            className="input-primary w-full pr-24 text-lg font-semibold"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            <button
              onClick={setMaxAmount}
              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              MAX
            </button>
            <div 
              ref={fromSelectorRef}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => {
                computePlacement(fromSelectorRef, setFromPlacement);
                setShowFromDropdown(!showFromDropdown);
              }}
            >
              <span className="text-lg">{selectedFromToken?.icon}</span>
              <span className="font-medium">{fromToken}</span>
              <FaChevronLeft className="text-sm text-gray-500" />
            </div>
          </div>
        </div>

        {/* From Token Dropdown */}
        {showFromDropdown && (
          <div
            className={`token-selector absolute top-full left-0 right-0 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 md:w-64 md:max-h-48 md:overflow-y-auto ${
              fromPlacement === 'right' ? 'md:right-full md:mr-2 md:top-1/2 md:-translate-y-1/2 md:left-auto' : 'md:left-full md:ml-2 md:top-1/2 md:-translate-y-1/2 md:right-auto'
            }`}
            style={{ minWidth: fromPlacement === 'right' ? undefined : undefined }}
          >
            {tokens.map((token) => (
              <div
                key={token.symbol}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  token.symbol === fromToken ? 'bg-primary/10 text-primary' : ''
                } ${token.symbol === toToken ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => token.symbol !== toToken && selectFromToken(token.symbol)}
              >
                <span className="text-lg">{token.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{token.symbol}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{token.name}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-medium text-gray-900 dark:text-white">${token.price}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Balance: {token.balance}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ≈ ${fromAmount ? (parseFloat(fromAmount) * parseFloat(selectedFromToken?.price || 0)).toLocaleString() : '0.00'}
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-3 relative z-10 mb-4">
        <button
          onClick={switchTokens}
          className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 p-3 rounded-full hover:border-primary transition-colors shadow-soft"
        >
          <FaExchangeAlt className="text-primary text-lg" />
        </button>
      </div>

      {/* To Token Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Balance: {selectedToToken?.balance} {toToken}
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            placeholder="0.00"
            className="input-primary w-full pr-20 text-lg font-semibold"
          />
          <div
            ref={toSelectorRef}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={() => {
              computePlacement(toSelectorRef, setToPlacement);
              setShowToDropdown(!showToDropdown);
            }}
          >
            <span className="text-lg">{selectedToToken?.icon}</span>
            <span className="font-medium">{toToken}</span>
            <FaChevronLeft className="text-sm text-gray-500" />
          </div>
        </div>

        {/* To Token Dropdown */}
        {showToDropdown && (
          <div
            className={`token-selector absolute top-full left-0 right-0 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 md:w-64 md:max-h-48 md:overflow-y-auto ${
              toPlacement === 'right' ? 'md:right-full md:mr-2 md:top-1/2 md:-translate-y-1/2 md:left-auto' : 'md:left-full md:ml-2 md:top-1/2 md:-translate-y-1/2 md:right-auto'
            }`}
          >
            {tokens.map((token) => (
              <div
                key={token.symbol}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  token.symbol === toToken ? 'bg-primary/10 text-primary' : ''
                } ${token.symbol === fromToken ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => token.symbol !== fromToken && selectToToken(token.symbol)}
              >
                <span className="text-lg">{token.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{token.symbol}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{token.name}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-medium text-gray-900 dark:text-white">${token.price}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Balance: {token.balance}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ≈ ${toAmount ? (parseFloat(toAmount) * parseFloat(selectedToToken?.price || 0)).toLocaleString() : '0.00'}
        </div>
      </div>

      {/* Swap Details */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span>Exchange Rate</span>
            <FaInfoCircle className="ml-1 text-xs" />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">
            1 {fromToken} = {exchangeRate} {toToken}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span>Slippage Tolerance</span>
            <FaInfoCircle className="ml-1 text-xs" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {['0.1', '0.5', '1.0'].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`px-2 py-1 text-xs rounded ${
                    slippage === value
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                  } transition-colors`}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FaGasPump className="mr-1" />
            <span>Network Fee</span>
          </div>
          <span className="font-medium text-gray-900 dark:text-white">~$2.50</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span>Minimum Received</span>
            <FaInfoCircle className="ml-1 text-xs" />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">
            {toAmount ? (parseFloat(toAmount) * 0.995).toFixed(4) : '0.0000'} {toToken}
          </span>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!fromAmount || !account || isLoading}
        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
          account && fromAmount && !isLoading
            ? 'btn-success'
            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : !account ? (
          'Connect Wallet to Swap'
        ) : currentNetwork === 'demo' ? (
          'Demo Swap (No Real Transaction)'
        ) : !exchangeContract ? (
          'Demo Mode - Connect to Localhost'
        ) : (
          'Swap Tokens'
        )}
      </button>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        By swapping, you agree to our Terms of Service and acknowledge the risks involved.
      </div>
    </div>
  );
};

export default TokenSwap;
