const mongoose = require("mongoose");

const privacyPolicySchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  privacy_policy: {
    type: String,
  },
});

module.exports = mongoose.model("PrivacyPolicy", privacyPolicySchema);
