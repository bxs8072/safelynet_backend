const authVerifier = require("../middlewares/auth_verifier")
const Mark = require("../models/mark")

const router = require("express").Router()

router.post("/add", authVerifier, async(req, res, next) => {
    
    try {
        const mark =  new Mark(req.body)

        await mark.save()
        res.status(200).json({data: mark, msg: "Successfully added marked place"})
    } catch (error) {
        res.status(500).json({msg: "Cannot add marked place"})

    }
})

router.get("/fetch-all", authVerifier, async(req, res, next) => {
    
    try {
        const mark = await Mark.find()

        res.status(200).json({data: mark, msg: "Successfully fetched marked place"})
    } catch (error) {
        res.status(500).json({msg: "cannot fetch marked place"})

    }
})

router.post("/fetch-by-email", authVerifier, async(req, res, next) => {
    
    try {
        const mark = await Mark.find({email: req.body.email})

        res.status(200).json({data: mark, msg: "Successfully fetched marked place by email"})
    } catch (error) {
        res.status(500).json({msg: "cannot fetch marked place by email"})

    }
})


module.exports = router