const { request, response } = require('express')

const getUsers = (req = request, res = response) => {
  const { body, query } = req
  const {
    page = 1,
    limit = 10
  } = query

  res.json({
    msg: 'get API - controller',
    body,
    page,
    limit
  })
}

const postUsers = (req, res = response) => {
  res.json({
    msg: 'post API - controller'
  })
}

const putUsers = (req, res = response) => {
  const { id } = req.params

  res.json({
    msg: 'put API - controller',
    id
  })
}

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch API - controller'
  })
}

const deleteUsers = (req, res = response) => {
  const { id } = req.params

  res.json({
    msg: 'delete API - controller',
    id
  })
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
}