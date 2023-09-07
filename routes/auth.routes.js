const { Router } = require('express')
const auth = require('../controllers/auth.controller')
const middlewares = require('../middlewares/routes/auth.middlewares')

const router = Router()

router.post('/login', middlewares.login, auth.login)

module.exports = router
