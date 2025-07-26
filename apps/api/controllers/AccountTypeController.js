const accountTypeServices = require('../services/AccountTypeServices');
const { getHeaderToken, tokenExpired } = require('../utils/TokenGenerator');

exports.getAccountType = async (req, res) => {
  try {
        const token = await getHeaderToken(req.headers);
        await tokenExpired(token);
    const profile = await accountTypeServices.getAccountType()
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   