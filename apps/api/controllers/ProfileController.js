const profileServices = require('../services/ProfileServices');
const { getHeaderToken, tokenExpired } = require('../utils/TokenGenerator');

exports.getProfile = async (req, res) => {

  try {
        const token = await getHeaderToken(req.headers);
        await tokenExpired(token);
    const profile = await profileServices.getProfile()
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   