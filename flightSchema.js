const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNo: {
        type: String,
        required: true,
        unique: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },

    economySeats: {
        type: Number,
        required: true
    },
    businessSeats: {
        type: Number,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    departureTerminal: {
        type: Number,
        default: 1
    },
    arrivalTerminal: {
        type: Number,
        default: 1
    },
    economyPrice: {
        type: Number,
        default: 100
    },
    businessPrice: {
        type: Number,
        default: 200
    },
    baggageAllowance: {
        type: Number,
        default: 20
    },
    freeSeats: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
