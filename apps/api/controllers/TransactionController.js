const transactionServices = require('../services/TransactionServices');

exports.getTransaction = async (req, res) => {
  try {
         const token = await getHeaderToken(req.headers);
            await tokenExpired(token);
    const profile = await transactionServices.getTransaction()
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.create = async (req, res) => {
  const { typeTransaction, amount, date, accountNumber } = req.body;

  try {
         const token = await getHeaderToken(req.headers);
            await tokenExpired(token);
    const profile = await transactionServices.create(typeTransaction, amount, date, accountNumber)
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   

exports.edit = async (req, res) => {
  const { id } = req.params
  const { typeTransaction, amount, date, accountNumber } = req.body

  try {
         const token = await getHeaderToken(req.headers);
            await tokenExpired(token);
    const profile = await transactionServices.edit(id, typeTransaction, amount, date, accountNumber)
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}  

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
         const token = await getHeaderToken(req.headers);
            await tokenExpired(token);
    const profile = await transactionServices.delete(id)
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}  