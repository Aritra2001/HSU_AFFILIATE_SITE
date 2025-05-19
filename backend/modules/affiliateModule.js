const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AffiliateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    experience: {
        type: String,
    },
    expectations: {
        type: String,
    },
    institution: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Affiliate', AffiliateSchema)
