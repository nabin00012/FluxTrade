import express from 'express';
import {
  getUser,
  createUser,
  updateUser,
  getUserStats,
} from '../controllers/userController.js';

const router = express.Router();

// @route   GET /api/users/:walletAddress
// @desc    Get user by wallet address
router.get('/:walletAddress', getUser);

// @route   POST /api/users
// @desc    Create a new user
router.post('/', createUser);

// @route   PUT /api/users/:walletAddress
// @desc    Update user preferences
router.put('/:walletAddress', updateUser);

// @route   GET /api/users/:walletAddress/stats
// @desc    Get user statistics
router.get('/:walletAddress/stats', getUserStats);

export default router;
