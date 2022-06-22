const mongoose = require('mongoose')
const { Schema, model } = mongoose

const dailySchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    iat: {
        type: String,
        required: true
    }
})

module.exports = model('Daily', dailySchema)