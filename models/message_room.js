const mongoose = require("mongoose");
const userSchema = require('./user').userSchema

const messageRoomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    createdAt:  {
        type: Date,
        default: Date.now,
    },
})

module.exports = {
    messageRoomSchema: messageRoomSchema,
    messageRoom: mongoose.model("MessageRoom", messageRoomSchema),
}