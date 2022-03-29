const mongoose = require("mongoose");
const contactSchema = require("./contact");

const userSchema =  new mongoose.Schema({        
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
    },
    email: {
        type: String,
        required: "Email address is required",
        index: true,
        unique: true,
    },
    name: {
        firstName: {
            type: String,
            trim: true,
            required: "First name is required"
        },
        middleName: String,
        lastName:  {
            type: String,
            trim: true,
            required: "Last name is required"
        },
    },
    photo: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    location: {
        latitude: Number,
        longitude: Number,
    },
    contacts: [contactSchema]
})


module.exports = {
    user: mongoose.model("User", userSchema),
    userSchema: userSchema
};