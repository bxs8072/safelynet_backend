const Auth = require("../models/auth")

const registerVerifier = async (req, res, next) => {
    const { email } = req.body
    try {
        const auth = await Auth.findOne({ email })

        if (auth) {
            return res.json({ message: "User already existed with provided email address" })
        }
     
    } catch (error) {
        return res.json({ message: "Something went wrong", error })
    }

    next()
}

module.exports = registerVerifier