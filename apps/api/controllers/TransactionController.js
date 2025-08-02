const transactionServices = require('../services/TransactionServices');
const { getHeaderToken, tokenExpired } = require('../utils/TokenGenerator');

exports.getTransaction = async (req, res) => {
  try {
    // const token = await getHeaderToken(req.headers);
    // await tokenExpired(token);
    const profile = await transactionServices.getTransaction();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const { typeTransaction, amount, date, accountNumber } = req.body;

  try {
    // const token = await getHeaderToken(req.headers);
    // await tokenExpired(token);
    const profile = await transactionServices.create(
      typeTransaction,
      amount,
      date,
      accountNumber
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const { typeTransaction, amount, date, accountNumber } = req.body;

  try {
    const profile = await transactionServices.edit(
      id,
      typeTransaction,
      amount,
      date,
      accountNumber
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return res.status(400).json({ message: 'Invalid file type. Only image files are allowed.' });
  }

  const base64Image = file.buffer.toString('base64');

  try {
    const profile = await transactionServices.uploadImage(
      id,
      base64Image,
      file.mimetype
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    // const token = await getHeaderToken(req.headers);
    // await tokenExpired(token);
    const profile = await transactionServices.delete(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
