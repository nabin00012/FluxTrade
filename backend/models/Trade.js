import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      lowercase: true,
    },
    fromToken: {
      type: String,
      required: true,
    },
    toToken: {
      type: String,
      required: true,
    },
    fromAmount: {
      type: String,
      required: true,
    },
    toAmount: {
      type: String,
      required: true,
    },
    exchangeRate: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    gasUsed: {
      type: String,
    },
    gasFee: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
tradeSchema.index({ walletAddress: 1, createdAt: -1 });
tradeSchema.index({ transactionHash: 1 });

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;
