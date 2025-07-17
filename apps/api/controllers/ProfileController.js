const profileServices = require('../services/ProfileServices');

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await profileServices.getProfile()
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   