const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    hallTicketNumber: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Birthday', birthdaySchema);