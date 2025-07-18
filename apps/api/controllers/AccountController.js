const accountServices = require('../services/AccountServices');
const { getHeaderToken, tokenExpired } = require('../utils/TokenGenerator');

exports.getAccount = async (req, res) => {
    try {
        const token = await getHeaderToken(req.headers);
        await tokenExpired(token);
    const account = await accountServices.getAccount()
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   


exports.create = async (req, res) => {
  const { accountNumber, balance, currency, accountType } = req.body;
  try {
        const token = await getHeaderToken(req.headers);
        await tokenExpired(token);
    const account = await accountServices.create(accountNumber, balance, currency, accountType)
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   