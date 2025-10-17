import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      sparse: true, // Optional field
      lowercase: true,
    },
    username: {
      type: String,
      sparse: true,
    },
    totalTrades: {
      type: Number,
      default: 0,
    },
    totalVolume: {
      type: String,
      default: '0',
    },
    preferences: {
      slippageTolerance: {
        type: Number,
        default: 0.5, // 0.5%
      },
      gasPrice: {
        type: String,
        default: 'medium',
        enum: ['low', 'medium', 'high'],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster lookups
userSchema.index({ walletAddress: 1 });

const User = mongoose.model('User', userSchema);

export default User;
