import User from '../models/User.js';
import Trade from '../models/Trade.js';

// @desc    Get user by wallet address
// @route   GET /api/users/:walletAddress
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      walletAddress: req.params.walletAddress.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// @desc    Create a new user
// @route   POST /api/users
export const createUser = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = await User.create({
      ...req.body,
      walletAddress: walletAddress.toLowerCase(),
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// @desc    Update user preferences
// @route   PUT /api/users/:walletAddress
export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { walletAddress: req.params.walletAddress.toLowerCase() },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/users/:walletAddress/stats
export const getUserStats = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get trade statistics
    const trades = await Trade.find({
      walletAddress: walletAddress.toLowerCase(),
      status: 'completed',
    });

    const stats = {
      totalTrades: trades.length,
      totalVolume: user.totalVolume,
      successRate: trades.length > 0 ? '100%' : '0%',
      recentTrades: trades.slice(0, 5),
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user stats',
      error: error.message,
    });
  }
};
