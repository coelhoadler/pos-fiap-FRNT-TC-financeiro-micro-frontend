const accountModel  = require('../models/AccountModel');

exports.getAccount = async () => {
  try {
    const accountAll = await accountModel.find()

    if (!accountAll) {
      throw new Error('Conta não encontrada');
    }

    return accountAll;
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
    const accountCreate = await accountModel.create(payload)

    if (!accountCreate) {
      throw new Error('Erro ao criar uma conta!');
    }

    return accountCreate;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

exports.getAccountById = async (accountNumber) => {
  try {
    const accountNumberFind = await accountModel.find({ accountNumber: accountNumber });

    if (!accountNumberFind) {
      throw new Error('Conta não encontrada');
    }

    return accountNumberFind;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}