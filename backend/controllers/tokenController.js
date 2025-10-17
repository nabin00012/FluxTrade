import Token from '../models/Token.js';

// @desc    Get all active tokens
// @route   GET /api/tokens
export const getTokens = async (req, res) => {
  try {
    const tokens = await Token.find({ isActive: true }).sort({ symbol: 1 });

    res.status(200).json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tokens',
      error: error.message,
    });
  }
};

// @desc    Get token by symbol
// @route   GET /api/tokens/:symbol
export const getTokenBySymbol = async (req, res) => {
  try {
    const token = await Token.findOne({
      symbol: req.params.symbol.toUpperCase(),
    });

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found',
      });
    }

    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching token',
      error: error.message,
    });
  }
};

// @desc    Add a new token
// @route   POST /api/tokens
export const createToken = async (req, res) => {
  try {
    const token = await Token.create(req.body);

    res.status(201).json({
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating token',
      error: error.message,
    });
  }
};

// @desc    Update token price
// @route   PUT /api/tokens/:symbol/price
export const updateTokenPrice = async (req, res) => {
  try {
    const token = await Token.findOneAndUpdate(
      { symbol: req.params.symbol.toUpperCase() },
      {
        currentPrice: req.body.currentPrice,
        priceChange24h: req.body.priceChange24h,
        volume24h: req.body.volume24h,
        marketCap: req.body.marketCap,
      },
      { new: true, runValidators: true }
    );

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found',
      });
    }

    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating token price',
      error: error.message,
    });
  }
};
