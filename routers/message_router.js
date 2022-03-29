const authVerifier = require("../middlewares/auth_verifier")
const messageRoomVerifier = require("../middlewares/message_room_verifier")
const Message = require("../models/message")

const router = require("express").Router()

router.post("/send", authVerifier, messageRoomVerifier, async (req, res, next) => {
    const sender = req.payload._id
    const room = req.payload.room

    console.log(room)
    const { content, contentType } = req.body

    try {
        const message = new Message({ room, content, contentType, sender })
        await message.save()
        return res.json({
            message: "Message sent successfully",
            data: message,
        })
    } catch (error) {
        console.log(error)

        return res.json({
            message: "Message failed to send",
            error: error,
        })
    }

})

router.post("/fetch-last-message", authVerifier, messageRoomVerifier, async (req, res, next) => {
    const room = req.payload.room

    try {
        const messages = await Message.find({room}).sort({createdAt: -1}).populate({ 
            path: 'room',
            populate: {
              path: 'users',
              model: 'User'
            } 
         }).populate('sender')

        return res.json({
            message: "Last message fetched successfully",
            data: messages[0],
        })
    } catch (error) {
        console.log(error)

        return res.json({
            message: "Failed to fetch last message",
            error: error,
        })
    }

})

module.exports = router