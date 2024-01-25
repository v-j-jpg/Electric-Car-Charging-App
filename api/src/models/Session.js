const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    connected_at: { 
        type: Date, default: new Date(), required: false
    }
})

const SessionModel = mongoose.model("session", SessionSchema)
module.exports = SessionModel;