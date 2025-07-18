const typeTransactionModel  = require('../models/TypeTransactionModel');

exports.getTypeTransaction = async () => {
  try {
    const profile = await typeTransactionModel.find()

    if (!profile) {
      throw new Error('Type Transaction not found');
    }

    return profile;
  } catch (error) {
    throw new Error(`Error fetching type transaction: ${error.message}`);
  }
}