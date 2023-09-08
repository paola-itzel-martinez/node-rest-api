const { request } = require('express')
const User = require('../models/user')
const { createUser, encryptPassword, saveDB, setResponseError } = require('../helpers')

const getUsers = async (req, response) => {
  const {
    limit = 10,
    skip = 0,
    state = true
  } = req.query

  const [total, users] = await Promise.all([
    User.countDocuments({ state }),
    User.find({ state })
      .limit(Number(limit))
      .skip(Number(skip))
  ])

  response.json({ total, users })
}

const postUsers = async (req = request, response) => {
  const { name, email, password, rol } = req.body

  try {
    const { code, data } = await createUser({ name, email, password, rol })

    if (code === 500) return setResponseError({ response })

    response.json({ user: data })
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    return setResponseError({ response, error })
  }
}

const putUsers = async (req, response) => {
  try { 
    const { id } = req.params
    const { name, password, img } = req.body
    let newPassword = password

    if (password) {
      newPassword = encryptPassword({ password })
    }

    const newData =  {
      name,
      password: newPassword,
      img
    }

    const user = await User.findByIdAndUpdate(id, newData)

    response.json({ user })
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    return setResponseError({ response, error })
  }
}

const patchUsers = (req, response) => {
  response.json({
    msg: 'patch API - controller'
  })
}

const deleteUsers = async (req, response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { state: false })

  response.json({ user })
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
}