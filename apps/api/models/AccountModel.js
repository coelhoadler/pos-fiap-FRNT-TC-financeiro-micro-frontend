const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true },
    balance: { type: String, required: true },
    currency: { type: String, required: true },
    accountType: { type: String, required: true },
},{timestamps: true })

module.exports = mongoose.model('Account', AccountSchema, 'Accounts');