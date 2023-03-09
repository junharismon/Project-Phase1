const { Job } = require('../models/index')

class Controller {
    static home(req, res) {
        res.render('home')
    }

    static job(req, res) {
        Job
            .findAll()
            .then((data) => {
                res.render('job', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static login(req, res) {

    }

    static register(req, res) {
        res.render('register')
    }
}

module.exports = Controller