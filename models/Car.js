const mongoose = require("mongoose")

const Car = new mongoose.Schema(
    {
        make: {
            //Validators
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        vin: {
            type: String,
            require: true
        },
        drivetrain: {
            type: String,
            require: true
        },
        fuel: {
            type: String,
            require: true
        },
        mileage: {
            type: Number,
            require: true
        },
        engine: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
)

// Generate a collection by creating a MODEL

module.exports = mongoose.model("cars", Car)