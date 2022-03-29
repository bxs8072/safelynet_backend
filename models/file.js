const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    url: {
        required: 'URL is required',
        type: String,
    },
    size: {
        type: String,
    },
    fileName: {
        type: String,
    },
    fileFor: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

})

module.exports = mongoose.model("File", fileSchema)