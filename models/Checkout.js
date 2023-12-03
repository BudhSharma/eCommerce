const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    country_name: {
        type: String,
    },
    street_address: {
        type: String,
    },
    apt_suite_unit: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    phone: {
        type: String,
    },
    save_information: {
        type: Boolean,
    },
    deliviry_type: {
        type: String,
    }
});

module.exports = mongoose.model("Checkout", checkoutSchema);
