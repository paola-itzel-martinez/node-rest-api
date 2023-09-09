const dbValidators = require('./dbValidators')
const categories = require('./categories.helpers')
const encryptPassword = require('./encryptPassword')
const errors = require('./errors')
const google = require('./google')
const jwt = require('./jwt')
const products = require('./products.helpers')
const saveFile = require('./saveFile')
const user = require('./user.helpers')

module.exports = {
    ...dbValidators,
    ...categories,
    ...encryptPassword,
    ...errors,
    ...google,
    ...jwt,
    ...products,
    ...saveFile,
    ...user
}
