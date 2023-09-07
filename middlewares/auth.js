const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { setResponseError} = require("../helpers/errors")

const AUTH_ERROR = {
    code: 401,
    error: 'Validation failed'
}

const validateToken = async (request, response, next) => {
    const token = request.header('Authorization')

    if (!token) return setResponseError({ response, ...AUTH_ERROR })

    try {
        const { uid } = jwt.verify(token, process.env.LOGIN_TOKEN_KEY)
        const user = await User.findOne({ _id: uid, state: true })

        if (!user) return setResponseError({ response, ...AUTH_ERROR })
        
        request.user = user
        
        next()
    } catch (error) {
        setResponseError({
            response,
            error
        })
    }
}

module.exports = {
    validateToken
}
