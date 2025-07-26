const mongoose = require('mongoose');

exports.mongooseConnection = () => {

  const mongoURI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/bytebank?authSource=admin';

  mongoose.Promise = global.Promise;

  return mongoose.connect(mongoURI);
};
