const mongoose = require("mongoose");

const atributteValueSchema = new mongoose.Schema({
    atributte_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Atributte",
    },
    atributte_value: {
        type: String,
    }
});

module.exports = mongoose.model("AtributteValue", atributteValueSchema);
