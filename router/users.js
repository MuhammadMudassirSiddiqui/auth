var express = require('express')
var router = express.Router()
var { User } = require('./../models/User')
const passport = require('passport')


// get login
router.get('/login', (req, res) => {
        res.render('login')
    })
    // get register
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    var errors = []
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'kindly fill all the require feilds' })
    }

    if (password !== password2) {
        errors.push({ msg: 'Password should be Matched' })
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be of 6 chars' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        User.findOne({ email }).then((resp) => {
            if (resp) {
                errors.push({ msg: 'this email is already in used' })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                var newUser = new User({
                    name,
                    email,
                    password
                })

                newUser.save().then((resp) => {
                    req.flash('success-msg', 'you have registered, now you can login')
                    res.redirect('/users/login')
                }).catch((err) => {
                    throw err
                })
            }
        })
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureFlash: '/users/login',
        failureFlash: true
    })(req, res, next)
})


// logOut route

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success-msg', 'thanks for your visiting')
    res.redirect('/')
})

module.exports = router