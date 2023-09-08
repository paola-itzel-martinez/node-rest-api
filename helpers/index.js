const dbValidators = require('./dbValidators')
const encryptPassword = require('./encryptPassword')
const errors = require('./errors')
const google = require('./google')
const jwt = require('./jwt')
const saveFile = require('./saveFile')
const user = require('./user')

module.exports = {
    ...dbValidators,
    ...encryptPassword,
    ...errors,
    ...google,
    ...jwt,
    ...saveFile,
    ...user
}
