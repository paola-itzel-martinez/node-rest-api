const { Router } = require('express')
const controllers = require('../controllers/auth.controller')
const middlewares = require('../middlewares/routes/auth.middlewares')

const router = Router()

router.post('/login', middlewares.login, controllers.login)
router.post('/googleSignIn', middlewares.googleSignIn, controllers.googleSignIn)

module.exports = router
