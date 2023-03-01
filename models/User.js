const mongoose = require("mongoose")

const User = new mongoose.Schema(
    {
        name: {
            //Validators
            type: String,
            max: 25,
            required: true,
            validate: /[a-z\s]/
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    // Creates createdAt and updatedAt timestamp
    { timestamps: true }
)

// Generate a collection by creating a MODEL

module.exports = mongoose.model("user", User)