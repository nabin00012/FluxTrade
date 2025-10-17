import TradeDashboard from '../components/TradeDashboard';
import TokenSwap from '../components/TokenSwap';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Trade on the{' '}
          <span className="gradient-text">Future of Finance</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Experience lightning-fast, secure, and decentralized trading with
          FluxTrade. Your gateway to DeFi.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Token Swap - Takes 1 column */}
        <div className="lg:col-span-1">
          <TokenSwap />
        </div>

        {/* Trade Dashboard - Takes 2 columns */}
        <div className="lg:col-span-2">
          <TradeDashboard />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="glass-card p-6 text-center hover:shadow-neon transition-all duration-300">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
          <p className="text-gray-400">
            Execute trades in milliseconds with our optimized smart contracts
          </p>
        </div>

        <div className="glass-card p-6 text-center hover:shadow-neon transition-all duration-300">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Secure & Audited</h3>
          <p className="text-gray-400">
            Your assets are protected by battle-tested smart contracts
          </p>
        </div>

        <div className="glass-card p-6 text-center hover:shadow-neon transition-all duration-300">
          <div className="text-4xl mb-4">💎</div>
          <h3 className="text-xl font-bold mb-2">Low Fees</h3>
          <p className="text-gray-400">
            Enjoy minimal transaction fees and maximize your returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
