const mongoose = require('mongoose');

exports.mongooseConnection = () => {
  const mongoURI = "mongodb+srv://tecon:123Asyst100@tecon.uw9fw3a.mongodb.net/bytebank"

  mongoose.Promise = global.Promise;

  return mongoose.connect(mongoURI);
};
