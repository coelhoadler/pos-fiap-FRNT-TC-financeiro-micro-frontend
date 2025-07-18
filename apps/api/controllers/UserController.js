const userServices = require('../services/UserServices');

exports.auth = async (req, res) => {
    const { email, password } = req.body
    try {
    const profile = await userServices.auth(email, password)
    res.status(200).json(profile);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}   

exports.create = async (req, res) => {
    const { name, email, password } = req.body
    try {
    const profile = await userServices.create(name, email, password)
    res.status(200).json(profile);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}  