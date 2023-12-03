const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number
  },
  message: {
    type: String
  },
  approved: {
    type: Boolean,
    default: false
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  healthExpertName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Customer', 'HealthExpert']
  }
})

module.exports = mongoose.model('Feedback', feedbackSchema)
