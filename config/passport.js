var localStrategy = require('passport-local').Strategy
var { User } = require('./../models/User')
var bcrypt = require('bcryptjs')

var test = function(passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email })
            .then((resp) => {
                if (!resp) {
                    done(null, false, { error: 'this email is not register' })
                }
                bcrypt.compare(password, resp.password, (err, result) => {
                    if (result) {
                        return done(null, resp)
                    }
                })
            })
            .catch((err) => {
                throw err
            })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}


module.exports = {
    test
}