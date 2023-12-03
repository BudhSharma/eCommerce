const mongoose = require("mongoose");

const fitSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    topic: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model("Fit", fitSchema);
