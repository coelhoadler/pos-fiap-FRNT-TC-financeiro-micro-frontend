const accountTypeServices = require('../services/AccountTypeServices');

exports.getAccountType = async (req, res) => {
  try {
    const profile = await accountTypeServices.getAccountType()
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   