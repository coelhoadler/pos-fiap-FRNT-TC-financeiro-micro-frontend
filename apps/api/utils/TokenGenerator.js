const jwt = require('jsonwebtoken');
const CustomError = require('../validator/CustomError');

exports.generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '8h' });
    return token;
}

exports.tokenData = (token) => {
    const payload = jwt.verify(token, process.env.JWT_KEY)
    return { id: payload.id }
}

exports.tokenExpired = async (token) => {
    try {
        jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            new CustomError(401, 'Token inválido ou expirado');
        }
        throw error;
    }
};

exports.getHeaderToken = async (headers) => {
    try {
        const { authorization } = headers

        if (!authorization) {
            throw new Error('Necessário informar o authorization token');
        }

        const splitAuthorization = authorization.split(" ")
        const token = splitAuthorization[1].replace('"', "")
        return token
    } catch (error) {
        throw error
    }
}