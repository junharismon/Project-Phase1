const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.job)

module.exports = router