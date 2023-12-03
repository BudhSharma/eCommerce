const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  purchase: {
    type: Boolean
  }
})

module.exports = mongoose.model('Cart', cartSchema)
