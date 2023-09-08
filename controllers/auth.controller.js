const { request, response } = require('express')
const User = require('../models/user')
const {
  createJWT,
  createUser,
  isValidPassword,
  googleLoginVerify,
  saveDB,
  setResponseError
} = require('../helpers')

const AUTH_ERROR = {
  code: 400,
  error: "bad email / password"
}

const login = async(req = request, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email, state: true })

    if (!user) return setResponseError({ response, ...AUTH_ERROR})

    if (!isValidPassword(password, user.password)) {
      return setResponseError({ response, ...AUTH_ERROR})
    }

    const token = await createJWT({ uid: user.id })

    res.json({ token })
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    return res.status(500).json(error)
  }
}

const googleSignIn = async(req = request, res = response) => {
  const { googleToken } = req.body

  try {
   const { name, picture, email } = await googleLoginVerify(googleToken)
   const user = await User.findOne({ email, state: true })

   if (!user) {
      const { code } = await createUser({ name, email, password: 'goo' })

      if (code === 500) return setResponseError({ response })
   }

   const token = await createJWT({ uid: user.id })

   res.json({ token, user })
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    return setResponseError({ response, error })
  }
}

module.exports = {
    login,
    googleSignIn
}