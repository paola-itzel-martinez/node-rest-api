const authMidlewares = require('./auth.middlewares')
const userMidlewares = require('./user.middlewares')

module.exports = {
    ...authMidlewares,
    ...userMidlewares
}
