const accountModel  = require('../models/AccountModel');

exports.getAccount = async () => {
  try {
    const profile = await accountModel.find()

    if (!profile) {
      throw new Error('Account not found');
    }

    return profile;
  } catch (error) {
    throw new Error(`Error fetching account: ${error.message}`);
  }
}