const accountServices = require('../services/AccountServices');
const { getHeaderToken, tokenExpired } = require('../utils/TokenGenerator');

exports.getAccount = async (req, res) => {
  cons
  try {
    // const token = await getHeaderToken(req.headers);
    // await tokenExpired(token);
    const account = await accountServices.getAccount();
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const { accountNumber, balance, currency, accountType } = req.body;
  try {
    // const token = await getHeaderToken(req.headers);
    // await tokenExpired(token);
    const account = await accountServices.create(
      accountNumber,
      balance,
      currency,
      accountType
    );
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  const { accountNumber } = req.params;
  try {
    // const token = await getHeaderToken(req.headers);
    // await tokenExpired(token);
    const account = await accountServices.getAccountById(accountNumber);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGetAccount = async (req, res) => {
  const { id } = req.params;
  try {
    // const token = await getHeaderToken(req.headers);
    // await tokenExpired(token);
    // const account = await accountServices.getAccountById(accountNumber);
    const account = {
      accountNumber: '123456789',
      accountType: 'Conta Corrente',
      balance: 1000,
      currency: 'BRL',
    };
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
