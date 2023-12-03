const mongoose = require('mongoose')

const blogBannerSchema = new mongoose.Schema(
  {
    banner: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('BlogBanner', blogBannerSchema)
