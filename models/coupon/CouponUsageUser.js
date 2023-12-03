const mongoose = require('mongoose')

const couponUsageUserSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    coupon_code: {
      type: String
    },
    usage_count: {
      type: Number
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("CouponUsage", couponUsageUserSchema)
