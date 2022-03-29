const mongoose = require("mongoose");

const Mark = mongoose.model(
    "Mark",
    new mongoose.Schema({
        location: {
            latitude: Number,
            longitude: Number,
        },
        detail: {
            type: String,
            default: "",
            trim: true,
        },
        priority: {
            type: Number,
            default: 0,
        },
        email: {
            type: String,
            required: true
        }
    })
);

module.exports = Mark;