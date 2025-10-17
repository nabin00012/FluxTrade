import { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaCoins,
  FaHistory,
} from 'react-icons/fa';
import { useWallet } from '../context/WalletContext';

const TradeDashboard = () => {
  const { account } = useWallet();
  const [stats, setStats] = useState({
    totalValue: '0.00',
    dailyChange: '0.00',
    totalTrades: 0,
  });

  // Placeholder data for popular tokens
  const popularTokens = [
    { symbol: 'ETH', name: 'Ethereum', price: '1,850.00', change: '+5.2%', isUp: true },
    { symbol: 'BTC', name: 'Bitcoin', price: '43,250.00', change: '+3.8%', isUp: true },
    { symbol: 'USDC', name: 'USD Coin', price: '1.00', change: '+0.01%', isUp: true },
    { symbol: 'DAI', name: 'Dai', price: '1.00', change: '-0.02%', isUp: false },
  ];

  // Placeholder transaction history
  const recentTransactions = [
    { type: 'Swap', from: 'ETH', to: 'USDC', amount: '0.5', time: '2 mins ago' },
    { type: 'Swap', from: 'USDC', to: 'DAI', amount: '1000', time: '1 hour ago' },
    { type: 'Swap', from: 'DAI', to: 'ETH', amount: '500', time: '3 hours ago' },
  ];

  useEffect(() => {
    // Placeholder for fetching user stats
    if (account) {
      // This would be replaced with actual API calls
      setStats({
        totalValue: '12,450.00',
        dailyChange: '+245.50',
        totalTrades: 42,
      });
    }
  }, [account]);

  if (!account) {
    return (
      <div className="glass-card p-12 text-center">
        <FaChartLine className="text-6xl text-primary mx-auto mb-4 opacity-50" />
        <h3 className="text-2xl font-bold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-400">
          Connect your wallet to view your trading dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Portfolio Value</span>
            <FaCoins className="text-primary" />
          </div>
          <div className="text-3xl font-bold">${stats.totalValue}</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">24h Change</span>
            <FaArrowUp className="text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">
            +${stats.dailyChange}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Trades</span>
            <FaHistory className="text-accent" />
          </div>
          <div className="text-3xl font-bold">{stats.totalTrades}</div>
        </div>
      </div>

      {/* Popular Tokens */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaChartLine className="mr-2 text-primary" />
          Popular Tokens
        </h3>
        <div className="space-y-3">
          {popularTokens.map((token) => (
            <div
              key={token.symbol}
              className="glass-card p-4 flex items-center justify-between hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center font-bold">
                  {token.symbol.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{token.symbol}</div>
                  <div className="text-sm text-gray-400">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${token.price}</div>
                <div
                  className={`text-sm flex items-center justify-end ${
                    token.isUp ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {token.isUp ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  {token.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaHistory className="mr-2 text-accent" />
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {recentTransactions.map((tx, index) => (
            <div
              key={index}
              className="glass-card p-4 flex items-center justify-between hover:bg-white/20 transition-all duration-300"
            >
              <div>
                <div className="font-semibold">
                  {tx.type}: {tx.from} → {tx.to}
                </div>
                <div className="text-sm text-gray-400">{tx.time}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{tx.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeDashboard;
