const mongoose = require("mongoose");

const deitSchema = new mongoose.Schema({
  health_expert_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customer_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  select_day: {
    type: String,
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  early_morning_meds: {
    type: String,
  },
  breakfast: {
    type: String,
  },
  snack: {
    type: String,
  },
  lunch: {
    type: String,
  },
  after_lunch_meds: {
    type: String,
  },
  evening: {
    type: String,
  },
  before_dinner_meds: {
    type: String,
  },
  dinner: {
    type: String,
  },
  after_meal_meds: {
    type: String,
  },
});

module.exports = mongoose.model("Deit", deitSchema);
