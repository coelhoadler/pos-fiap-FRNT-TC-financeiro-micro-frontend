const userModel = require('../models/UserModel');
const { generateHas, compareHash } = require('../utils/HasManager');
const { generateToken } = require('../utils/TokenGenerator');
const CustomError = require('../validator/CustomError');

exports.auth = async (email, password) => {
  try {
    const model = await userModel.find({ email: email })

    if (!model) throw new Error('Usuário não encontrado')

    if (model.length === 0) {
      throw new Error('Nenhum usuário localizado')
    }

    const isHasValid = await compareHash(password, model[0].password);

    if (!isHasValid) {
      throw new Error('E-mail ou senha invalido!')
    }

    const token = generateToken(model[0].id);

    return { name: model[0].name, email: model[0].email, token: token, accountNumber: model[0].accountNumber }; 

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
      password: passwordHas,
      accountNumber: `AC-${Math.floor(Math.random() * 1000000)}` 
    }

    const model = await userModel.create(payload)

    return model

  } catch (error) {
    throw new Error(error.message);
  }

};


exports.getUserById = async (id) => {
  try {
    
    if (!id) {
      throw new CustomError(400,'Id do usuário não fornecido');      
    }
    
    const user = await userModel.findById(id);

    if(user.length === 0) {
      throw new CustomError(404, 'Usuário não encontrado');
    }

    return user;

  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, error.message);
  }
};