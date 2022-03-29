
const MessageRoom = require("../models/message_room").messageRoom
const mongoose = require('mongoose')
const messageRoomVerifier = async (req, res, next) => {
    const sender =  new mongoose.mongo.ObjectId(req.payload._id)

    const reciever =  new mongoose.mongo.ObjectId(req.body.reciever)

    try {
        const room = await MessageRoom.findOne({ users: { "$all": [sender, reciever] } })

        if (room) {
            req.payload.room = room._id
            next()
        } else {
            const messageRoom = new MessageRoom({ users: [sender, reciever] })
            
            await messageRoom.save()
           
            req.payload.room = messageRoom._id

            next()
        }
    } catch (error) {
        console.log(error)

        res.status(403).json({
            error: true,
            message: "Unable to create room",
        })
    }

}

module.exports = messageRoomVerifier