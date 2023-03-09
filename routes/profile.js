const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/add', Controller.addProfileRender)
router.post('/add/:id', Controller.addProfileHandler)

router.get('/:id', Controller.getProfile)
module.exports = router