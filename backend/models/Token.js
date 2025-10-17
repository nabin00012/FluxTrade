import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    decimals: {
      type: Number,
      required: true,
      default: 18,
    },
    logoUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Price tracking (could be updated from external API)
    currentPrice: {
      type: String,
      default: '0',
    },
    priceChange24h: {
      type: String,
      default: '0',
    },
    volume24h: {
      type: String,
      default: '0',
    },
    marketCap: {
      type: String,
      default: '0',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes are already created by unique constraints on symbol and contractAddress

const Token = mongoose.model('Token', tokenSchema);

export default Token;
