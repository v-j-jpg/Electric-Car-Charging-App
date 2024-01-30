const mongoose = require("mongoose");

//A frozen object can no longer be changed;
const Status = Object.freeze({
    Available: 'available',
    Occupied: 'occupied',
    Preparing: 'preparing',
    Faulted: 'faulted'
  });

const ChargerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: 'available',
        required: false
    },
    position: {
        lat: { type: Number, required: false },
        lng: { type: Number,  required: false }
    },
    user: {
        type: String,
        require: false
    }
})

ChargerSchema.virtual('full_position').get(function() {
    return this.position.lat + '\n ' + this.position.lng;
});

const ChargerModel = mongoose.model("chargers", ChargerSchema)
module.exports = ChargerModel;