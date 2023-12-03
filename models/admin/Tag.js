const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active", "In-Active"]
    },
});

module.exports = mongoose.model("Tag", tagSchema);
