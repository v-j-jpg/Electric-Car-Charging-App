const mongoose = require("mongoose");

//A frozen object can no longer be changed;
const Status = Object.freeze({
    Available: 'available',
    Occupied: 'occupied',
    Preparing: 'preparing',
    Faulted: 'faulted'
  });

const SessionSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    chargerID:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: 'occupied',
        required: false
    },
    connected_at: { 
        type: Date, default: new Date(), required: false
    }
})

const SessionModel = mongoose.model("session", SessionSchema)
module.exports = SessionModel;