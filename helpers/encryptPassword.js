const bcryptjs = require('bcryptjs')

const encryptPassword = ({ password }) => {
    try {
        const salt = bcryptjs.genSaltSync()
    
        return bcryptjs.hashSync(password, salt)  
    } catch {
        return null
    }
}

module.exports = {
    encryptPassword
}