import { FaShieldAlt, FaRocket, FaUsers, FaChartLine, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import TradeDashboard from '../components/TradeDashboard';
import TokenSwap from '../components/TokenSwap';
import { useWallet } from '../context/WalletContext';

const Home = () => {
  const { account, connectWallet, isConnecting } = useWallet();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto mobile-padding py-16 lg:py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <FaRocket className="mr-2" />
              Trusted by 10,000+ traders worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Professional{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DeFi Trading
              </span>{' '}
              Platform
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience institutional-grade trading with lightning-fast execution,
              advanced security, and competitive fees. Trade cryptocurrencies with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                <FaExchangeAlt className="inline mr-2" />
                Start Trading
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                <FaChartLine className="inline mr-2" />
                View Markets
              </button>
            </div>
          </div>

          {/* Trading Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">$2.1B+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-success mb-2">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-warning mb-2">0.1%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trading Fee</div>
            </div>
          </div>
        </div>
      </section>

      {/* MetaMask Connection & Live Prices Section */}
      <section className="bg-white dark:bg-gray-800 py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* MetaMask Connection */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Connect Your MetaMask Wallet
              </h2>
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className={`w-3 h-3 rounded-full mr-2 ${account ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span className={`text-sm font-medium ${account ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                  {account ? 'Wallet Connected' : 'Wallet Not Connected'}
                </span>
              </div>
              {account && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-mono">
                  {account}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To start trading, connect your MetaMask wallet. If you don't have MetaMask installed,
                download the Chrome extension for the best experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  <FaWallet className="mr-2" />
                  Download MetaMask Extension
                </a>
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="btn-secondary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaWallet className="mr-2" />
                  {isConnecting ? 'Connecting...' : account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
                </button>
              </div>
            </div>

            {/* Live Prices Notice */}
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Prices Active
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real-Time Cryptocurrency Prices
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All prices are fetched live from CoinGecko API and updated every 5 minutes.
                Trade with confidence using the most accurate market data available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Trading Interface */}
      <section className="max-w-7xl mx-auto mobile-padding py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Token Swap - Left Column */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <TokenSwap />
            </div>
          </div>

          {/* Trade Dashboard - Right Columns */}
          <div className="xl:col-span-2">
            <TradeDashboard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose FluxTrade?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built for professional traders with enterprise-grade security and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="trading-card text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <FaShieldAlt className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Bank-Grade Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Multi-signature wallets, audited smart contracts, and institutional custody solutions
              </p>
            </div>

            <div className="trading-card text-center group">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <FaRocket className="text-2xl text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sub-second trade execution with optimized Layer 2 solutions and advanced routing
              </p>
            </div>

            <div className="trading-card text-center group">
              <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                <FaUsers className="text-2xl text-success" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Institutional Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dedicated account management, custom integrations, and priority support for institutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-professional text-white py-16">
        <div className="max-w-4xl mx-auto text-center mobile-padding">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust FluxTrade for their DeFi trading needs.
            Start with as little as $10 and experience professional-grade trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaWallet className="inline mr-2" />
              {isConnecting ? 'Connecting...' : account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
