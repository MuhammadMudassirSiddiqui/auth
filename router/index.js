var express = require('express')
var router = express.Router()
var { ensureAuthenticate } = require('./../config/auth')

router.get('/', (req, res) => {
        res.render('welcome')
    })
    // dashboard routing

router.get('/dashboard', ensureAuthenticate, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    })
})
module.exports = router