const mongoose = require("mongoose");

const atributteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
});

module.exports = mongoose.model("Atributte", atributteSchema);
