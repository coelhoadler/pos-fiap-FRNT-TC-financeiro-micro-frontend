const accountServices = require('../services/AccountServices');

exports.getAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await accountServices.getAccount()
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   