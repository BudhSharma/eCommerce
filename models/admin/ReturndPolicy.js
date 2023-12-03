const mongoose = require("mongoose");

const returnPolicySchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  description: {
    type: String,
  },
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
});

module.exports = mongoose.model("ReturnPolicy", returnPolicySchema);
