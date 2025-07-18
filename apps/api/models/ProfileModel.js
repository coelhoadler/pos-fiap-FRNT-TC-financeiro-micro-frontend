const mongoose = require('mongoose');

const PrifleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    accountNumber: { type: String, required: true },
},{timestamps: true })

module.exports = mongoose.model('Profile', PrifleSchema, 'Profiles');