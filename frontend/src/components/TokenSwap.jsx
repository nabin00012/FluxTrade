import { useState, useEffect } from 'react';
import { FaExchangeAlt, FaChevronDown, FaInfoCircle, FaGasPump, FaClock } from 'react-icons/fa';
import { useWallet } from '../context/WalletContext';
import { ethers } from 'ethers';
import deployments from '../contracts/deployments.json';
import exchangeABI from '../contracts/abis/FluxTradeExchange.json';
import tokenABI from '../contracts/abis/ERC20.json';

const TokenSwap = () => {
  const { account, signer, provider } = useWallet();
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeContract, setExchangeContract] = useState(null);
  const [tokenContracts, setTokenContracts] = useState({});

  // Initialize contracts when wallet is connected
  useEffect(() => {
    if (signer && provider) {
      initializeContracts();
    }
  }, [signer, provider]);

  const initializeContracts = async () => {
    try {
      // Initialize exchange contract
      const exchange = new ethers.Contract(deployments.exchangeAddress, exchangeABI, signer);
      setExchangeContract(exchange);

      // Initialize token contracts
      const tokens = {};
      for (const [symbol, address] of Object.entries(deployments.tokens)) {
        tokens[symbol] = new ethers.Contract(address, tokenABI, signer);
      }
      setTokenContracts(tokens);
    } catch (error) {
      console.error('Error initializing contracts:', error);
    }
  };

    // Professional token list with contract addresses
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.45', price: '$1,850.00', icon: 'Ξ', address: '0x0000000000000000000000000000000000000000' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,250.00', price: '$1.00', icon: '💲', address: deployments.tokens?.USDC || '' },
    { symbol: 'DAI', name: 'Dai', balance: '500.00', price: '$1.00', icon: '🪙', address: deployments.tokens?.DAI || '' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.025', price: '$43,250.00', icon: '₿', address: deployments.tokens?.WBTC || '' },
  ];

  const selectedFromToken = tokens.find(t => t.symbol === fromToken);
  const selectedToToken = tokens.find(t => t.symbol === toToken);

  // Calculate exchange rate (placeholder)
  const exchangeRate = fromToken === 'ETH' && toToken === 'USDC' ? '1,850.00' : '1.00';

  const handleSwap = async () => {
    if (!account || !exchangeContract) {
      alert('Please connect your wallet first!');
      return;
    }
    if (!fromAmount) {
      alert('Please enter an amount to swap');
      return;
    }

    setIsLoading(true);
    try {
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
        const approveTx = await tokenContract.approve(deployments.exchangeAddress, amountIn);
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

  const setMaxAmount = () => {
    if (selectedFromToken) {
      setFromAmount(selectedFromToken.balance);
    }
  };

  return (
    <div className="trading-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Swap Tokens</h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FaClock className="mr-1" />
          ~30s
        </div>
      </div>

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
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <span className="text-lg">{selectedFromToken?.icon}</span>
              <span className="font-medium">{fromToken}</span>
              <FaChevronDown className="text-sm text-gray-500" />
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ≈ ${fromAmount ? (parseFloat(fromAmount) * parseFloat(selectedFromToken?.price.replace(/[$,]/g, '') || 0)).toLocaleString() : '0.00'}
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
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
            <span className="text-lg">{selectedToToken?.icon}</span>
            <span className="font-medium">{toToken}</span>
            <FaChevronDown className="text-sm text-gray-500" />
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ≈ ${toAmount ? (parseFloat(toAmount) * parseFloat(selectedToToken?.price.replace(/[$,]/g, '') || 0)).toLocaleString() : '0.00'}
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
        ) : account ? (
          'Swap Tokens'
        ) : (
          'Connect Wallet to Swap'
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
