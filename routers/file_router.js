const authVerifier = require("../middlewares/auth_verifier")
const path = require('path')
const File = require('../models/file')

const router = require("express").Router()

var multer = require('multer')
var fs = require('fs');
var upload = multer({ dest: 'public/uploads/' })

//upload
router.post('/upload', authVerifier, upload.single("file"), async (req, res, next) => {
    const user = req.payload._id

    console.log("Received file: " + req.file.originalname)

    var src = fs.createReadStream(req.file.path)

    let size = req.file.size
    let fileName = req.file.originalname
    let URL = '/uploads/' + fileName
    let fileFor = req.body.fileFor

    var dest = fs.createWriteStream("public" + URL)

    src.pipe(dest)

    src.on('end', async () => {
        fs.unlinkSync(req.file.path)

        const newFile = new File({
            url: URL,
            fileName,
            fileFor,
            size,
            user,
        })

        await newFile.save()

        res.json({
            message: "File uploaded successfully",
            fileId: newFile.id,
            url: URL
        })
    });

    src.on('error', function (err) {
        res.json('Something went wrong!')
        console.log(err)
    })
})


const moveFile = (file, dir) => {
    return new Promise((resolve, reject) => {
        file.mv(dir, function (err) {
            if (err) reject("Could not move file.")
            else resolve()
        })
    })
}

// store

router.post("/store", authVerifier, async (req, res, next) => {
    const user = req.payload._id

    console.log(req.file)

    if (!req.files) throw "File was not supplied"

    const fileFor = req.body.fileFor || ""
    const file = req.files.file
    const fileName = file.name
    const size = file.data.length
    const extension = path.extname(fileName)
    const allowedExtensions = /png|jpg|jpeg/

    const md5 = file.md5

    let url;

    const validExtension = allowedExtensions.test(extension.toLowerCase())

    if (!validExtension) throw "Only image file is allowed"
    if (size > 10000000) throw "File size should be less than 10 MB"

    URL = "/uploads" + md5 + extension

    await file.mv("./public" + URL)

    const newFile = new File({
        url: URL,
        fileName: fileName,
        fileFor,
        size,
        user,
    })

    await newFile.save();

    res.json({
        message: "File uploaded successfully",
        fileId: newFile.id,
        url: process.env.APPURL + URL
    })
})

router.delete('/:id', authVerifier, async (req, res, next) => {

    const id = req.params.id
    const token = req.headers.token

    const { email, _id } = jwt.verify(token, process.env.TOKEN_SECRET)


    try {
        const file = await File.findById(id)

        const fs = require('fs')

        const path = './public/files/' + _id + "/" + file.title

        fs.unlink(path, async (err) => {
            if (err) {
                return res.json({ message: "Failed to delete fileSchema: ", id, err })
            }

            await File.findByIdAndDelete(id)

            return res.json({ message: "Successfully deleted fileSchema: ", id })
        })

    } catch (error) {

        return res.json({ message: "Failed to delete fileSchema: ", id, error })

    }
})

module.exports = router