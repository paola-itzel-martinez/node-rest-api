const { Router } = require('express')
const users = require('../controllers/users.controller')

const router = Router()

router.get('/', users.getUsers)
router.put('/:id', users.putUsers)
router.post('/', users.postUsers)
router.patch('/', users.patchUsers)
router.delete('/:id', users.deleteUsers)


module.exports = router
