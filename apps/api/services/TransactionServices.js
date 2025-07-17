const transactionModel  = require('../models/TransactionModel');

exports.getTransaction = async () => {
  try {
    const transaction = await transactionModel.find()

    if (!transaction) {
      throw new Error('Type Transaction not found');
    }

    return transaction;
  } catch (error) {
    throw new Error(`Error fetching type transaction: ${error.message}`);
  }
}

exports.create = async (typeTransaction, amount, date, accountNumber) => {
  try {
    const createTransaction = await transactionModel.create({
      typeTransaction,
      amount,
      date,
      accountNumber
    })

    if (!createTransaction) {
      throw new Error('Type Transaction not found');
    }

    return createTransaction;
  } catch (error) {
    throw new Error(`Error fetching type transaction: ${error.message}`);
  }
}

exports.edit = async (id, typeTransaction, amount, date, accountNumber) => {
  try {
    const payloadUpdate = {
      typeTransaction, amount, date, accountNumber
    }
    const editTransaction = await transactionModel.findByIdAndUpdate(id, payloadUpdate, { new: true } )

    if (!editTransaction) {
      throw new Error('Type Transaction not found');
    }

    return editTransaction;
  } catch (error) {
    throw new Error(`Error fetching type transaction: ${error.message}`);
  }
}

exports.delete = async (id) => {
  try {
   
    const editTransaction = await transactionModel.findByIdAndDelete(id, { new: true })

    if (!editTransaction) {
      throw new Error('Type Transaction not found');
    }

    return editTransaction;
  } catch (error) {
    throw new Error(`Error fetching type transaction: ${error.message}`);
  }
}