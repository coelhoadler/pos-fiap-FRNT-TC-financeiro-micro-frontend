const mongoose = require('mongoose');

let DB_USER = ''
let DB_PASSWORD = ''
let DB_DATABASE = ''
let DB_SERVER = ''

DB_USER = process.env.DB_USER
DB_PASSWORD = process.env.DB_PASSWORD
DB_DATABASE = process.env.DB_DATABASE
DB_SERVER = process.env.DB_SERVER

const mongooseConnection = () =>{
    mongoose.Promise = global.Promise
    // const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}/${DB_DATABASE}?retryWrites=true&w=majority`    
    // const url = `mongodb+srv://tecon:123Asyst100@tecon.uw9fw3a.mongodb.net/bytebank?retryWrites=true&w=majority`    
    const url = `mongodb://admin:admin123@localhost:27017/bytebank?authSource=admin`
    return mongoose.connect(url)
}

module.exports = mongooseConnection