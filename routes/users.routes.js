const { Router } = require('express')
const users = require('../controllers/users.controller')
const middlewares = require('../middlewares/routes/user.middlewares')

const router = Router()

router.get('/', middlewares.get, users.getUsers)

router.post('/', middlewares.post, users.postUsers)

router.put('/:id', middlewares.put, users.putUsers)

router.patch('/', middlewares.patch, users.patchUsers)

router.delete('/:id', middlewares.delete, users.deleteUsers)

module.exports = router
