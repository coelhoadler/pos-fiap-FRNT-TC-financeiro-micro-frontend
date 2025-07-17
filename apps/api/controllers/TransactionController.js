const transactionServices = require('../services/TransactionServices');

exports.getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await transactionServices.getTransaction()
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.transacion = async (req, res) => {
  const { typeTransaction, amount, date, accountNumber } = req.body;

  try {
    const profile = await transactionServices.transaction(typeTransaction, amount, date, accountNumber)
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   