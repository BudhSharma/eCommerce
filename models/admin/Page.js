const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  banner: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  our_data: [
    {
      heading: {
        type: String
      },
      topics: [
        {
          type: String
        }
      ]
    }
  ],
  about: [
    {
      heading: {
        type: String,
      },
      details: {
        type: String,
      },
    },
  ],
})

module.exports = mongoose.model('Page', pageSchema)
