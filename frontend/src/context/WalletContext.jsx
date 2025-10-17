import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Check MetaMask availability
  useEffect(() => {
    const checkMetaMask = () => {
      const isInstalled = typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;
      setIsMetaMaskInstalled(isInstalled);
      console.log('MetaMask installed:', isInstalled);
    };

    checkMetaMask();
  }, []);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        console.log('MetaMask not detected');
        return;
      }

      console.log('Checking for existing wallet connection...');
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        console.log('Found existing connection:', accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        setAccount(accounts[0]);
        setProvider(provider);
        setSigner(signer);
        setChainId(Number(network.chainId));
      } else {
        console.log('No existing wallet connection found');
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setIsConnecting(true);

      // Check if MetaMask is installed
      if (!isMetaMaskInstalled) {
        const install = confirm('MetaMask is not installed! Click OK to install MetaMask, then refresh this page.');
        if (install) {
          window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
        }
        return;
      }

      // Check if MetaMask is unlocked
      try {
        await window.ethereum.request({ method: 'eth_accounts' });
      } catch (unlockError) {
        if (unlockError.code === 4001) {
          alert('Please unlock your MetaMask wallet first!');
          return;
        }
      }

      console.log('Requesting wallet connection...');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Wallet connected:', accounts[0]);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      setAccount(accounts[0]);
      setProvider(provider);
      setSigner(signer);
      setChainId(Number(network.chainId));

      console.log('Wallet fully connected with network:', network.name);
    } catch (error) {
      console.error('Error connecting wallet:', error);

      if (error.code === 4001) {
        alert('Connection rejected by user. Please try again and approve the connection in MetaMask.');
      } else if (error.code === -32002) {
        alert('Connection request already pending. Please check MetaMask and approve the request.');
      } else {
        alert(`Failed to connect wallet: ${error.message}`);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  }, []);

  const handleChainChanged = useCallback(() => {
    window.location.reload();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged]);

  const value = {
    account,
    provider,
    signer,
    chainId,
    isConnecting,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
