import { useWallet } from '../context/WalletContext';
import { FaWallet, FaSpinner } from 'react-icons/fa';

const WalletConnect = () => {
  const { account, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (account) {
    return (
      <div className="flex items-center space-x-3">
        <div className="glass-card px-4 py-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">{formatAddress(account)}</span>
        </div>
        <button
          onClick={disconnectWallet}
          className="glass-card px-4 py-2 hover:bg-white/20 transition-all duration-300"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="neon-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <FaWallet />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};

export default WalletConnect;
