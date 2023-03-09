const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.register)

module.exports = router