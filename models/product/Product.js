const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    category_name: {
      type: String
    },
    product_name: {
      type: String,
      required: true
    },
    product_price: {
      type: String,
      required: true
    },
    product_image: {
      type: String,
      required: true
    },
    product_description: {
      type: String,
      required: true
    },
    sku_code: {
      type: String
    },
    tags: {
      type: String
    },
    product_type: {
      type: String,
      enum: ['Simple', 'Variable']
    },
    attribute: {
      type: String
    },
    weight: {
      type: String
    },
    color: {
      type: String
    },
    gallery_image: [
      {
        type: String
      }
    ],
    verientation: [
      {
        type: [
          {
            color: {
              type: String
            },
            size: {
              type: String
            }
          }
        ],
        sku: {
          type: String
        },
        price: {
          type: String
        },
        min_quantity: {
          type: String
        },
        max_quantity: {
          type: String
        },
        image: {
          type: String
        },
        stock_amount: {
          type: String
        },
        status: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
