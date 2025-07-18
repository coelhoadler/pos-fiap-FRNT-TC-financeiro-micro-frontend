const mongoose = require('mongoose');

exports.mongooseConnection = () => {
  const url = `mongodb://admin:admin123@mongodb:27017/bytebank?authSource=admin`;

  mongoose.Promise = global.Promise;

  return mongoose.connect(url);
};
