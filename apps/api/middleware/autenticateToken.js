const { tokenExpired } = require("../utils/TokenGenerator");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
        await tokenExpired(token);    
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

module.exports = authenticateToken;