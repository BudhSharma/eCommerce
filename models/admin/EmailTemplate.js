const mongoose = require('mongoose')

const emailTemplateSchema = new mongoose.Schema({
  from_name: {
    type: String,
    required: true
  },
  from_email: {
    type: String,
    required: true
  },
  email_category: {
    type: String,
    required: true
  },
  email_subject: {
    type: String,
    required: true
  },
  email_content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Active',
    enum: ['Active', 'In-Active']
  }
})

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema)
