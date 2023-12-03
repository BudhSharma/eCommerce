const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true
    },
    description: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true
    },
    discountValue: {
      type: Number,
      required: true
    },
    minPurchase: Number,
    maxUses: Number,
    startDate: Date,
    endDate: Date,
    isActive: {
      type: String,
      enum: ['Active', 'In-Active']
    },
    usageCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Coupon', couponSchema)
