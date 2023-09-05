const { request, response } = require('express')
const User = require('../models/user')
const { encryptPassword } = require('../helpers/encryptPassword')
const { saveDB } = require('../helpers/saveFile')

const getUsers = async (req = request, res = response) => {
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

  res.json({ total, users })
}

const postUsers = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body
  let user = null

  try {
    user = new User({ name, email, password, rol })

    user.password = encryptPassword({ password })
  
    await user.save()

    res.json({ user })
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    return res.status(400).json(error)
  }
}

const putUsers = async (req, res = response) => {
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

    res.json({ user })
  } catch (error) {
    saveDB({ type: "ERROR", data: error })
    return res.status(400).json(error)
  }
}

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch API - controller'
  })
}

const deleteUsers = async (req, res = response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { state: false })

  res.json({ user })
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
}