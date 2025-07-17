const transactionModel  = require('../models/TransactionModel');

exports.getTransaction = async () => {
  try {
    const profile = await transactionModel.find()

    if (!profile) {
      throw new Error('Type Transaction not found');
    }

    return profile;
  } catch (error) {
    throw new Error(`Error fetching type transaction: ${error.message}`);
  }
}

exports.transaction = async (typeTransaction, amount, date, accountNumber) => {
  try {
    const profile = await transactionModel.create({
      typeTransaction,
      amount,
      date,
      accountNumber
    })

    if (!profile) {
      throw new Error('Type Transaction not found');
    }

    return profile;
  } catch (error) {
    throw new Error(`Error fetching type transaction: ${error.message}`);
  }
}