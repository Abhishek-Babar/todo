const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model("ToDo", todoSchema)