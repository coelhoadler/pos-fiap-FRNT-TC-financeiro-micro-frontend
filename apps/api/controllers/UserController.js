const userServices = require('../services/UserServices');
const { tokenData } = require('../utils/TokenGenerator');
const userModel = require('../models/UserModel');

exports.auth = async (req, res) => {
    const { email, password } = req.body
    try {
        const profile = await userServices.auth(email, password)

        res.cookie('token', profile.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 3600000,
        })

        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.create = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const profile = await userServices.create(name, email, password)
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.info = async (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' })
        }

        const { id } = tokenData(token);
        const user = await userModel.findById(id)

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        return res.status(200).json({
            name: user.name,
            email: user.email,
            token: token,
        });
    } catch (error) {
        res.clearCookie('token');
        res.status(401).json({ message: 'Token inválido ou expirado' })
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout realizado com sucesso' });
};
