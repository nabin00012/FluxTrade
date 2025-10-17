import { useState } from 'react';
import { FaExchangeAlt, FaChevronDown } from 'react-icons/fa';
import { useWallet } from '../context/WalletContext';

const TokenSwap = () => {
  const { account } = useWallet();
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  // Placeholder tokens
  const tokens = ['ETH', 'USDC', 'DAI', 'WBTC', 'USDT'];

  const handleSwap = () => {
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }
    // Placeholder for swap logic
    console.log('Swapping', fromAmount, fromToken, 'to', toToken);
    alert('Swap functionality will be implemented with smart contracts');
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 gradient-text">Swap Tokens</h2>

      {/* From Token */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mb-2 block">From</label>
        <div className="glass-card p-4 flex items-center justify-between">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-2xl font-semibold outline-none flex-grow"
          />
          <div className="flex items-center space-x-2 ml-4">
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-white/10 px-3 py-2 rounded-lg outline-none cursor-pointer appearance-none pr-8"
            >
              {tokens.map((token) => (
                <option key={token} value={token} className="bg-gray-900">
                  {token}
                </option>
              ))}
            </select>
            <FaChevronDown className="text-sm -ml-6 pointer-events-none" />
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-2">Balance: 0.00 {fromToken}</div>
      </div>

      {/* Swap Icon */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={switchTokens}
          className="glass-card p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:rotate-180"
        >
          <FaExchangeAlt className="text-xl text-primary" />
        </button>
      </div>

      {/* To Token */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">To</label>
        <div className="glass-card p-4 flex items-center justify-between">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-2xl font-semibold outline-none flex-grow"
          />
          <div className="flex items-center space-x-2 ml-4">
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-white/10 px-3 py-2 rounded-lg outline-none cursor-pointer appearance-none pr-8"
            >
              {tokens.map((token) => (
                <option key={token} value={token} className="bg-gray-900">
                  {token}
                </option>
              ))}
            </select>
            <FaChevronDown className="text-sm -ml-6 pointer-events-none" />
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-2">Balance: 0.00 {toToken}</div>
      </div>

      {/* Swap Details */}
      <div className="glass-card p-4 mb-6 space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Exchange Rate</span>
          <span className="text-white">1 {fromToken} = 1,850 {toToken}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Slippage Tolerance</span>
          <span className="text-white">0.5%</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Network Fee</span>
          <span className="text-white">~$2.50</span>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!fromAmount || !account}
        className="neon-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {account ? 'Swap Tokens' : 'Connect Wallet to Swap'}
      </button>
    </div>
  );
};

export default TokenSwap;
