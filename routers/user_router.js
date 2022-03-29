const User = require("../models/user").user
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authVerifier = require("../middlewares/auth_verifier")

const router = require("express").Router()

router.post("/fetch-by-email", authVerifier, async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        console.log(user)
        return res.json({
            message: "Successfully fetched",
            data: user
        })
    } catch (error) {
        return res.json({
            message: "Failed to fetch",
            data: null
        })
    }
})

router.post("/create-account", authVerifier, async (req, res, next) => {

    req.body._id = req.payload._id

    console.log(req.body)

    const user = new User(req.body)

    try {
        await user.save()
        res.json({ msg: "Successfully created user account" })
    } catch (error) {
        console.log(error)
        res.json({ msg: "Failed to create user account" })
    }
})

router.post("/exist", async (req, res, next) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (user)
            res.status(200).json({ msg: "Successfully found user account", data: true })
        else
            res.status(200).json({ msg: "Sorry cannot found user account", data: false })
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
    }
})

router.post("/account", authVerifier, async (req, res, next) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        res.status(200).json({ msg: "Successfully fetched user account", data: user })
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch user account" })
    }
})

router.patch("/account", authVerifier, async (req, res, next) => {
    console.log(req.payload._id)
    try {
        const user = await User.findByIdAndUpdate(req.payload._id,
            { $set: req.body },
            { new: true, upsert: true });

        res.status(200).json({ msg: "Successfully fetched user account", data: user })
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch user account" })
    }
})

module.exports = router