const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true
    },

    registeredAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Registration", registrationSchema);