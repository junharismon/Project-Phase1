const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.register)
router.post ('/', Controller.registerHandler)

module.exports = router