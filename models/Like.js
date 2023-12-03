const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    is_liked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Like", likeSchema);
