const bcrypt = require('bcryptjs')

exports.generateHas = async (str) => {
    const rounds = Number(process.env.BCRYPT_COST)
    const salt = await bcrypt.genSalt(rounds)
    const result = await bcrypt.hash(str, salt)
    return result
}

exports.compareHash = async (str, hash) => {
    const result = await bcrypt.compare(str, hash)
    return result
}