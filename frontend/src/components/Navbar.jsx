import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import { FaBolt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="glass-card mx-4 my-4 p-4 sticky top-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg group-hover:shadow-neon transition-all duration-300">
            <FaBolt className="text-2xl text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">FluxTrade</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Trade
          </Link>
          <Link
            to="/portfolio"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Portfolio
          </Link>
          <Link
            to="/liquidity"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Liquidity
          </Link>
          <Link
            to="/analytics"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Analytics
          </Link>
        </div>

        {/* Wallet Connect Button */}
        <WalletConnect />
      </div>
    </nav>
  );
};

export default Navbar;
