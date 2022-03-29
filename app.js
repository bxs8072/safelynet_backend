//express
const express = require("express")
const app = express()

//body parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }))
app.use(bodyParser.json({limit: "100mb"}))

//cors
const cors = require("cors")
app.use(cors())

//files
app.use(express.static(__dirname + '/public'));


//View Engine
app.set('view engine', 'ejs')

const authRouter = require("./routers/auth_router")
const userRouter = require("./routers/user_router")
const markRouter = require("./routers/mark_router")
const fileRouter = require("./routers/file_router")
const messageRouter = require("./routers/message_router")
const messageRoomRouter = require("./routers/message_room_router")

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/mark", markRouter)
app.use("/file", fileRouter)
app.use("/message", messageRouter)
app.use("/message-room", messageRoomRouter)

module.exports = app