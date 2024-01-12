const { Long, Double, Decimal128 } = require("mongodb");
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
    latitude:{
        type: Decimal128,
        required: false
    },
    longitude:{
        type: Decimal128,
        required: false
    },
})

const ChargerModel = mongoose.model("chargers", ChargerSchema)
module.exports = ChargerModel;