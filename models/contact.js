const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        firstName: String,
        middleName: String,
        lastName: String,
    },
    photo: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
})

module.exports = contactSchema