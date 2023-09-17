const { check } = require('express-validator')
const {
    isEmailRegistered,
    isValidRol,
    isValidUserId
} = require('../../helpers/dbValidators')
const { validateFields } = require('../fieldValidations')

const get = []

const post = [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email not allowed').isEmail(),
    check('password', 'password must has 6 characters').isLength(6),
    check('email').custom(isEmailRegistered),
    check('rol').custom(isValidRol),
    validateFields
]

const put = [
    check('id', 'id not valid').isMongoId(),
    check('id').custom(isValidUserId),
    check('rol').custom(isValidRol),
    validateFields
]

const patch = []

const deleteMiddleware = [
    //check('id', 'id not valid').isMongoId(),
    //check('id').custom(isValidUserId),
    validateFields
]

module.exports = {
    get,
    post,
    put,
    patch,
    delete: deleteMiddleware
}
