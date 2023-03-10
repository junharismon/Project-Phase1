const { Job, User, Profile, UserJob } = require('../models/index')
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const nodeMailer = require('../helpers/nodeMailer');

class Controller {
    static home(req, res) {
        res.render('home')
    }

    static job(req, res) {
        const { title, location, category } = req.query
        let options = {}
          if (title) {
            options = { 
                where: { title :{ [Op.iLike]: `%${title}%` }}
            }
            console.log(options)
          }
          
        if (title, location, category) {
            options = {
                where: {
                    title: {
                        [Op.iLike]: `%${title}%`
                    },
                    location: {
                        [Op.iLike]: `%${location}%`
                    },
                    category: {
                        [Op.iLike]: `%${category}%`
                    }
                }
            }
        }
        if (title) {
            options = {
                where: {
                    title: {
                        [Op.iLike]: `%${title}%`
                    }
                }
            }
        }
        if (location) {
            options = {
                where: {
                    location: {
                        [Op.iLike]: `%${location}%`
                    }
                }
            }
        }
        if (category) {
            options = {
                where: {
                    category: {
                        [Op.iLike]: `%${category}%`
                    }
                }
            }
        }
        if (title, location) {
            options = {
                where: {
                    title: {
                        [Op.iLike]: `%${title}%`
                    },
                    location: {
                        [Op.iLike]: `%${location}%`
                    }
                }
            }
        }
        if (title, category) {
            options = {
                where: {
                    title: {
                        [Op.iLike]: `%${title}%`
                    },
                    category: {
                        [Op.iLike]: `%${category}%`
                    }
                }
            }
        }
        if (location, category) {
            options = {
                where: {
                    title: {
                        [Op.iLike]: `%${title}%`
                    },
                    location: {
                        [Op.iLike]: `%${location}%`
                    },
                    category: {
                        [Op.iLike]: `%${category}%`
                    }
                }
            }
        }
        let dataJob;
        let dataUserJob;
        Job
            .findAll(options)
            .then((data) => {
                dataJob = data
                const userId = req.session.UserId
                return UserJob.findUserId(userId)
            })
            .then((data2) => {
                dataUserJob = data2
                const userId = req.session.UserId
                return User.findOne({
                    where: { id : userId}
                })
            })
            .then((dataUser) => {
                res.render('job', { data: dataJob, dataUserJob, dataUser })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static login(req, res) {
        if(req.session.UserId){
            res.redirect('/')
        } else{
            const { error } = req.query
            res.render('login', { error })
        }
    }

    static loginHandler(req, res) {
        const { username, password } = req.body
        User.findOne({ where: { username } })
            .then((user) => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {
                        req.session.UserId = user.id
                        return res.redirect('/')
                    } else {
                        const error = 'Invalid Username/Password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'Invalid Username/Password'
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static register(req, res) {
        const { errors } = req.query
        res.render('register', { errors })
    }

    static registerHandler(req, res) {
        const { username, email, password } = req.body
        User.create({ username, email, password })
            .then(() => {
                nodeMailer(email)
                res.redirect('/login')
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/register?errors=${errors}`)
                } else if (err.name === 'SequelizeUniqueConstraintError') {
                    let errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/register?errors=${errors}`)
                }
                else {
                    res.send(err)
                }
            })
    }
    static getProfile(req, res) {
        const { id } = req.params
        Profile.findOne({
            where: {
                UserId: id
            }
        })
        .then((data) => {
            res.render('profile', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addProfileRender(req, res) {
        const { errors } = req.query
        User.findOne({
            where: {
                id: req.session.UserId
            }
        })
            .then((data) => {
                res.render('addProfile', { data, errors })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addProfileHandler(req, res) {
        const { id } = req.params
        const { name, gender, age, phone, location } = req.body
        Profile.create({ name, gender, age, phone, location, UserId: req.session.UserId }, {
            where: { id }
        })
            .then(() => {
                User.update({ hasProfile: true }, { where: { id: req.session.UserId } })
            })
            .then(() => {
                res.redirect(`/`)
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/profile/add?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static editProfileRender(req, res) {
        const { id } = req.session.UserId

        Profile.findByPk(id)
            .then((data) => {
                res.render('editProfile', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static apply(req, res) {
        const { id } = req.params

        UserJob.findOne({
            where: {
                JobId: id
            }
        })
            .then(() => {
                UserJob.create({ JobId: id, UserId: req.session.UserId })
                res.redirect('/jobs')
            })
            //   .then(()=> {
            //   })
            .catch((err) => {
                res.send(err)
            })
    }
    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            }
            else {
                res.redirect('/')
            }
        })
    }
    static delete(req, res){
        const { id } = req.params
        Profile.destroy({where : { id }})
        .then(() => {
            User.update({hasProfile : false}, {where: { id : req.session.UserId }})
        })
        .then(()=>{
            res.redirect('/')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller