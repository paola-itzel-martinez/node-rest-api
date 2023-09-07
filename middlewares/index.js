const auth = require('./auth')
const rol = require('./rol')
const validateFields = require('./validateFields')

module.exports = {
    ...auth,
    ...rol,
    ...validateFields
}
