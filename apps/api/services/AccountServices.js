const accountModel  = require('../models/AccountModel');

exports.getAccount = async () => {
  try {
    const profile = await accountModel.find()

    if (!profile) {
      throw new Error('Conta não encontrada');
    }

    return profile;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

exports.create = async (accountNumber, balance, currency, accountType) => {
  try {
    const payload = {
      accountNumber, 
      balance, 
      currency, 
      accountType
    }
    const profile = await accountModel.create(payload)

    if (!profile) {
      throw new Error('Erro ao criar uma conta!');
    }

    return profile;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}