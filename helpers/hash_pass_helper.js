const bcrypt = require('bcrypt');

function HashPassword(pass) {
    const saltParse = parseInt(10);
    const salt = bcrypt.genSaltSync(saltParse)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
}

function ComparePassword(pass, hashPassword) {
    const compare = bcrypt.compareSync(pass, hashPassword)
    return compare
}

module.exports = {
    HashPassword,
    ComparePassword
}