const mongoose = require('mongoose');

const TypeTransactionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
},{timestamps: true })

module.exports = mongoose.model('TypeTransaction', TypeTransactionSchema);