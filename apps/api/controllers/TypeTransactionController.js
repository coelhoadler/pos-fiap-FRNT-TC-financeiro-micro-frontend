const typeTransactionServices = require('../services/TypeTransactionServices');

exports.getTypeTransaction = async (req, res) => {
  try {
    const profile = await typeTransactionServices.getTypeTransaction()
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   