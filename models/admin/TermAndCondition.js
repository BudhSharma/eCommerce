const mongoose = require("mongoose");

const termAndConditionUsSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  term_condition: {
    type: String,
  },
  section: [
    {
      title: {
        type: String,
      },
      decription: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("TermAndCondition", termAndConditionUsSchema);
