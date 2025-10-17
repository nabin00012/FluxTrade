import Trade from '../models/Trade.js';
import User from '../models/User.js';

// @desc    Get all trades
// @route   GET /api/trades
export const getTrades = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const trades = await Trade.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Trade.countDocuments();

    res.status(200).json({
      success: true,
      data: trades,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trades',
      error: error.message,
    });
  }
};

// @desc    Get trade by ID
// @route   GET /api/trades/:id
export const getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: 'Trade not found',
      });
    }

    res.status(200).json({
      success: true,
      data: trade,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trade',
      error: error.message,
    });
  }
};

// @desc    Create a new trade
// @route   POST /api/trades
export const createTrade = async (req, res) => {
  try {
    const trade = await Trade.create(req.body);

    // Update user's trade count
    await User.findOneAndUpdate(
      { walletAddress: req.body.walletAddress },
      {
        $inc: { totalTrades: 1 },
        $set: { walletAddress: req.body.walletAddress },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      data: trade,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating trade',
      error: error.message,
    });
  }
};

// @desc    Get trades by user wallet address
// @route   GET /api/trades/user/:walletAddress
export const getUserTrades = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const trades = await Trade.find({ walletAddress: walletAddress.toLowerCase() })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Trade.countDocuments({ walletAddress: walletAddress.toLowerCase() });

    res.status(200).json({
      success: true,
      data: trades,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user trades',
      error: error.message,
    });
  }
};
