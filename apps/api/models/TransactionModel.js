const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    // id: { type: String, required: true },
    typeTransaction: { type: Object, required: true },
    amount: { type: String, required: true },
    date: { type: String, required: true },
    accountNumber: { type: String, required: true },
    base64Image: { type: String, default: null },
    fileMimetype: { type: String, default: null },
},{ timestamps: true })

module.exports = mongoose.model('Transaction', TransactionSchema, 'Transactions');