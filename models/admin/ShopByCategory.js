const mongoose = require('mongoose')

const shopByCategorySchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  product_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  product_details: [
    {
      product_title: {
        type: String
      },
      product_actual_price: {
        type: String
      },
      product_discount_price: {
        type: String
      },
      product_image: {
        type: String
      }
    }
  ]
})

module.exports = mongoose.model('ShopByCategory', shopByCategorySchema)
