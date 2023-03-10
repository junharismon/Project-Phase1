const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.job)
router.post('/:id/apply', Controller.apply)
module.exports = router