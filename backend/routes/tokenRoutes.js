import express from 'express';
import {
  getTokens,
  getTokenBySymbol,
  createToken,
  updateTokenPrice,
} from '../controllers/tokenController.js';

const router = express.Router();

// @route   GET /api/tokens
// @desc    Get all active tokens
router.get('/', getTokens);

// @route   GET /api/tokens/:symbol
// @desc    Get token by symbol
router.get('/:symbol', getTokenBySymbol);

// @route   POST /api/tokens
// @desc    Add a new token
router.post('/', createToken);

// @route   PUT /api/tokens/:symbol/price
// @desc    Update token price
router.put('/:symbol/price', updateTokenPrice);

export default router;
