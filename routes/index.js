const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const routerJob = require('./job')
const routerLogin = require('./login')
const routerRegister = require('./register')
const routerProfile = require('./profile')

router.get('/', Controller.home)
router.use('/login', routerLogin)
router.use('/register', routerRegister)
router.get('/logout', Controller.logout)
router.use(function (req,res, next){
    if(!req.session.UserId){
        const error = 'Please login first'
        res.redirect(`/login?error=${error}`)
    } else{
        next()
    }
})
router.use('/jobs', routerJob)
router.use('/profile', routerProfile)
module.exports = router