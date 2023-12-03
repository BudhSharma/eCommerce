const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  about_image: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  our_data: [
    {
      heading: {
        type: String,
      },
      topics: [
        {
          type: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("About", aboutSchema);
