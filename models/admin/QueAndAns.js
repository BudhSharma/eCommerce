const mongoose = require('mongoose')

const queAndAnsSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    question: {
      type: String
    },
    answer: {
      type: String
    },
    status: {
      type: String
    },
    type: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('QueAndAns', queAndAnsSchema)
