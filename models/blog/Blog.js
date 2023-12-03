const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    blog: {
      type: String
    },
    blog_image: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchema)
