const accountTypeModel  = require('../models/AccountTypeModel');

exports.getAccountType = async () => {
  try {
    const profile = await accountTypeModel.find()

    if (!profile) {
      throw new Error('Account type not found');
    }

    return profile;
  } catch (error) {
    throw new Error(`Error fetching account type: ${error.message}`);
  }
}