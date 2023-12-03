const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
