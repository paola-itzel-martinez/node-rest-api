const { encryptPassword } = require('./encryptPassword')
const User = require('../models/user')

const createUser = async(newUser) => {
  const { password } = newUser
  let user = null

  try {
    user = new User(newUser)

    if (user) {
      user.password = encryptPassword({ password })
    
      await user.save()
    }

    return {
      code: 200,
      data: user
    }
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    
    return {
      code: 500,
      error
    }
  }
}

module.exports = {
    createUser
}
