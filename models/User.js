const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    profile_image: {
      type: String
    },
    location: {
      type: String
    },
    latitude: {
      type: String
    },
    longitude: {
      type: String
    },
    profile_pic: {
      type: String
    },
    address: [
      {
        streetAddress: {
          type: String
        },
        aptSuitUnit: {
          type: String
        },
        city: {
          type: String
        },
        state: {
          type: String
        },
        postal_code: {
          type: String
        },
        phone: {
          type: String
        },
        delivery_instruction: {
          type: String
        },
        address_type: {
          type: String,
          enum: ['Home', 'Billing']
        }
      }
    ],
    role: {
      type: String,
      enum: ['Customer', 'HealthExpert', 'Admin']
    },
    otp: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      default: 'Active',
      enum: ['Active', 'In-Active']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
