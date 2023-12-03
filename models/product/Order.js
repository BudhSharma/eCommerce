const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: Number
      }
    ],
    order_id: {
      type: String
    },
    delivery_type: {
      type: String
    },
    date: {
      type: String
    },
    note: {
      type: String
    },
    order_status: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
