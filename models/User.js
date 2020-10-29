var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})
UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            user.password = hash
            next()
        })
    } else {
        next()
    }
})

var User = mongoose.model('users', UserSchema)

module.exports = {
    User
}