const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessageRoom",
        required: true,
    },
    content: {
        type: String,
        trim: true,
    },
    contentType: {
        type: String,
        default: "text"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Message", messageSchema);