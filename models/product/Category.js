const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  category_description: {
    type: String,
    required: true,
  },
  category_image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
