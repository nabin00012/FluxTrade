import { FaGithub, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-card mx-4 mb-4 p-6 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">FluxTrade</h3>
            <p className="text-gray-400 text-sm">
              A decentralized trading platform built on blockchain technology.
              Trade with confidence and security.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Token Swap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Liquidity Pools
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Yield Farming
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Governance
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Smart Contracts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security Audits
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="glass-card p-3 hover:bg-white/20 transition-all duration-300 hover:shadow-neon"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="#"
                className="glass-card p-3 hover:bg-white/20 transition-all duration-300 hover:shadow-neon"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="glass-card p-3 hover:bg-white/20 transition-all duration-300 hover:shadow-neon"
              >
                <FaDiscord className="text-xl" />
              </a>
              <a
                href="#"
                className="glass-card p-3 hover:bg-white/20 transition-all duration-300 hover:shadow-neon"
              >
                <FaTelegram className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} FluxTrade. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
