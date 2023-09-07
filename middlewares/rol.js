const { setResponseError } = require('../helpers')

const isAdmin = (request, response, next) => {
    const { rol } = request.user  || {}
    const isAdmin = rol === 'ADMIN_ROL' ?? false

    if (!isAdmin) return setResponseError({ response })

    next()
}

const hasRole = (...rols) => {
    return (request, response, next) => {
        const { rol } = request.user  || {}
        const hasRol = [...rols].includes(rol) ?? false

        if (!hasRol) return setResponseError({ response })

        next()
    }
}

module.exports = {
    isAdmin,
    hasRole
}
