const dotenv = require("dotenv")

dotenv.config()
//database
const db = require("./database/database")
db.connect()

const app = require("./app")

app.listen(process.env.PORT, () => {
    console.log("Server is running in port: " + process.env.PORT);
})
