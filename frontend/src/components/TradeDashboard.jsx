import { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaCoins,
  FaHistory,
  FaWallet,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { useWallet } from '../context/WalletContext';
import { getTokenPrices } from '../utils/priceFeeds';
import axios from 'axios';

const TradeDashboard = () => {
  const { account } = useWallet();
  const [stats, setStats] = useState({
    totalValue: '0.00',
    dailyChange: '0.00',
    totalTrades: 0,
  });
  const [showBalances, setShowBalances] = useState(true);
  const [tokenPrices, setTokenPrices] = useState({});
  const [userTrades, setUserTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [account]);

  const fetchDashboardData = async () => {
    if (!account) return;

    try {
      setLoading(true);

      // Fetch token prices
      const prices = await getTokenPrices();
      setTokenPrices(prices);

      // Fetch user trades from backend
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/trades/user/${account}`);
        if (response.data.success) {
          setUserTrades(response.data.data);
        }
      } catch (apiError) {
        console.log('No trades found for user, using empty array');
        setUserTrades([]);
      }

      // Calculate portfolio stats
      calculatePortfolioStats(prices);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePortfolioStats = (prices) => {
    // Mock portfolio calculation - in real app, this would come from wallet balances
    const mockBalances = {
      ETH: 2.45,
      USDC: 1250,
      DAI: 500,
      WBTC: 0.025
    };

    let totalValue = 0;
    let totalChange = 0;

    Object.entries(mockBalances).forEach(([symbol, balance]) => {
      const price = prices[symbol]?.price || 0;
      const change24h = prices[symbol]?.change24h || 0;

      totalValue += balance * price;
      totalChange += (balance * price * change24h) / 100;
    });

    setStats({
      totalValue: totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      dailyChange: totalChange.toFixed(2),
      totalTrades: userTrades.length,
    });
  };

  // Professional token data with more details
  const popularTokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '1,850.00',
      change: '+5.2%',
      changeValue: '+96.20',
      isUp: true,
      volume: '2.1B',
      marketCap: '221.8B',
      icon: 'Ξ'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '43,250.00',
      change: '+3.8%',
      changeValue: '+1,587.50',
      isUp: true,
      volume: '15.2B',
      marketCap: '843.2B',
      icon: '₿'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      price: '1.00',
      change: '+0.01%',
      changeValue: '+0.0001',
      isUp: true,
      volume: '8.9B',
      marketCap: '25.4B',
      icon: '💲'
    },
    {
      symbol: 'DAI',
      name: 'Dai',
      price: '1.00',
      change: '-0.02%',
      changeValue: '-0.0002',
      isUp: false,
      volume: '1.2B',
      marketCap: '5.3B',
      icon: '🪙'
    },
  ];

  // Enhanced transaction history
  // Format user trades for display
  const recentTransactions = userTrades.slice(0, 5).map(trade => ({
    type: 'Swap',
    from: trade.fromToken,
    to: trade.toToken,
    amount: trade.fromAmount.toString(),
    received: trade.toAmount.toString(),
    time: new Date(trade.timestamp).toLocaleString(),
    status: trade.status,
    txHash: trade.txHash
  }));

  useEffect(() => {
    // Enhanced stats for connected wallet
    if (account) {
      setStats({
        totalValue: '12,450.00',
        dailyChange: '+245.50',
        totalTrades: 42,
      });
    }
  }, [account]);

  if (!account) {
    return (
      <div className="trading-card text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaWallet className="text-2xl text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Connect Your Wallet
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          Connect your wallet to view your trading dashboard, portfolio analytics, and transaction history.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">
            <FaWallet className="mr-2" />
            Secure connection powered by MetaMask
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="trading-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live Prices
            </div>
            <button
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {showBalances ? <FaEyeSlash className="mr-1" /> : <FaEye className="mr-1" />}
              {showBalances ? 'Hide' : 'Show'} Balances
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaCoins className="text-primary mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {showBalances ? `$${stats.totalValue}` : '••••••'}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaChartLine className={`mr-2 ${stats.dailyChange.startsWith('+') ? 'text-success' : 'text-danger'}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">24h Change</span>
            </div>
            <div className={`text-3xl font-bold ${stats.dailyChange.startsWith('+') ? 'text-success' : 'text-danger'}`}>
              {showBalances ? `${stats.dailyChange.startsWith('+') ? '+' : ''}$${stats.dailyChange}` : '••••••'}
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FaHistory className="text-accent mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Trades</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalTrades}
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="trading-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Market Overview</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">Live prices</span>
        </div>

        <div className="space-y-4">
          {popularTokens.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                  {token.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{token.symbol}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{token.name}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">${token.price}</div>
                <div className={`text-sm flex items-center justify-end ${
                  token.isUp ? 'text-success' : 'text-danger'
                }`}>
                  {token.isUp ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  {token.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="trading-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          <button className="text-sm text-primary hover:text-primary-dark transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading transactions...</p>
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <FaHistory className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Start trading to see your transaction history</p>
            </div>
          ) : (
            recentTransactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">↔</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {tx.type}: {tx.from} → {tx.to}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <span>{tx.time}</span>
                    <span className="mx-2">•</span>
                    <span className="text-success font-medium">{tx.status}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {tx.amount} {tx.from}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  → {tx.received} {tx.to}
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default TradeDashboard;
