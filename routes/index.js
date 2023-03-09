const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const routerJob = require('./job')
const routerLogin = require('./login')
const routerRegister = require('./register')

router.get('/', Controller.home)
router.use('/jobs', routerJob)
router.use('/login', routerLogin)
router.use('/register', routerRegister)

module.exports = router