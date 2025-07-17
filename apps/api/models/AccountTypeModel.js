const mongoose = require('mongoose');

const AccountTypeSchema = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
},{timestamps: true })

module.exports = mongoose.model('AccountType', AccountTypeSchema);