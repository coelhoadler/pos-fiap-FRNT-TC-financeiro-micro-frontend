const userModel = require('../models/UserModel');
const { generateHas, compareHash } = require('../utils/HasManager');
const { generateToken } = require('../utils/TokenGenerator');


exports.auth = async (email, password) => {
  try {
    const model = await userModel.find({ email: email })

    if (!model) throw new Error('Usuário não encontrado')

    if (model.length === 0) {
      throw new Error('Nenhum usuário localizado')
    }

    const isHasValid = await compareHash(password, model[0].password)
    if (!isHasValid) {
      throw new Error('E-mail ou senha invalido!')
    }

    const token = generateToken(model[0].id)

    return { name: model[0].name, email: model[0].email, token: token }

  } catch (error) {
    throw new Error(error.message)
  }
};

exports.create = async (name, email, password) => {
  try {
    const passwordHas = await generateHas(password)

    const payload = {
      name,
      email,
      password: passwordHas
    }

    const model = await userModel.create(payload)

    return model

  } catch (error) {
    throw new Error(error.message);
  }

};

exports.info = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
    const { id } = tokenData(token);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
