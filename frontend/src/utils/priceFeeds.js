import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Cache for price data (5 minute cache)
let priceCache = {};
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getTokenPrices = async () => {
  try {
    // Check if cache is still valid
    if (Date.now() - cacheTimestamp < CACHE_DURATION && Object.keys(priceCache).length > 0) {
      return priceCache;
    }

    // Fetch prices from CoinGecko
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: 'ethereum,usd-coin,dai,wrapped-bitcoin',
        vs_currencies: 'usd',
        include_24hr_change: true
      }
    });

    // Map to our token symbols
    const prices = {
      ETH: {
        price: response.data.ethereum.usd,
        change24h: response.data.ethereum.usd_24h_change
      },
      USDC: {
        price: response.data['usd-coin'].usd,
        change24h: response.data['usd-coin'].usd_24h_change
      },
      DAI: {
        price: response.data.dai.usd,
        change24h: response.data.dai.usd_24h_change
      },
      WBTC: {
        price: response.data['wrapped-bitcoin'].usd,
        change24h: response.data['wrapped-bitcoin'].usd_24h_change
      }
    };

    // Update cache
    priceCache = prices;
    cacheTimestamp = Date.now();

    return prices;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    // Return fallback prices if API fails
    return {
      ETH: { price: 1850.00, change24h: 2.5 },
      USDC: { price: 1.00, change24h: 0.0 },
      DAI: { price: 1.00, change24h: 0.0 },
      WBTC: { price: 43250.00, change24h: -1.2 }
    };
  }
};

export const getTokenPrice = async (symbol) => {
  const prices = await getTokenPrices();
  return prices[symbol] || { price: 0, change24h: 0 };
};