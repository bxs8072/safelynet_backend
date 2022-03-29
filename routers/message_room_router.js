const authVerifier = require("../middlewares/auth_verifier")
const MessageRoom = require("../models/message_room").messageRoom

const router = require("express").Router()

router.post('/fetch', authVerifier,  async(req, res, next) => {
    const sender = req.payload._id
    const reciever = req.body.reciever

    let users = [sender, reciever]

    try {
        const room = await MessageRoom.find().where('users').in(users)

        if (room) {
            return res.json({
                message: "Room already existed", 
                data: room._id
            })
        } else {
            const messageRoom = new MessageRoom({ users: [sender, reciever] })
            await messageRoom.save()
            
            return res.json({
                message: "Room created", 
                data: messageRoom._id
            })
        }
    } catch (error) {

        res.status(403).json({
            error: true,
            message: "Unable to create room",
        })
    }
})


router.post('/fetch-all', authVerifier,  async(req, res, next) => {
    const sender = req.payload._id

    try {
        const rooms = await MessageRoom.find().where('users').in([sender]).populate('users')

        if (rooms) {
            return res.json({
                message: "Room already existed", 
                data: rooms
            })
        } else {                       
            return res.json({
                message: "No rooms created", 
                data: []
            })
        }
    } catch (error) {

        res.status(403).json({
            error: true,
            message: "Unable to fetch rooms",
        })
    }
})





module.exports = router