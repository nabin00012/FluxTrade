import express from 'express';
import {
  getTrades,
  getTradeById,
  createTrade,
  getUserTrades,
} from '../controllers/tradeController.js';

const router = express.Router();

// @route   GET /api/trades
// @desc    Get all trades (with pagination)
router.get('/', getTrades);

// @route   GET /api/trades/:id
// @desc    Get trade by ID
router.get('/:id', getTradeById);

// @route   POST /api/trades
// @desc    Create a new trade
router.post('/', createTrade);

// @route   GET /api/trades/user/:walletAddress
// @desc    Get trades by user wallet address
router.get('/user/:walletAddress', getUserTrades);

export default router;
