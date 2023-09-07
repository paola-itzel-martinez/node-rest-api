const { request, response } = require('express')
const User = require('../models/user')
const { isValidPassword } = require('../helpers/encryptPassword')
const { createJWT } = require('../helpers/jwt')
const { saveDB } = require('../helpers/saveFile')

const login = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email, state: true })

    if (!user) {
        return res.status(400).json({
            msg: "bad email / password"
        })
    }

    if (!isValidPassword(password, user.password)) {
        return res.status(400).json({
            msg: "bad email / password"
        })
    }

    const token = await createJWT({ uid: user.id })

    res.json({ token })
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    return res.status(500).json(error)
  }
}

module.exports = {
    login
}