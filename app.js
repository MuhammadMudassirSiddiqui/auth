var passport = require('passport')
var mongoose = require('mongoose')
var express = require('express')
var expressLayouts = require('express-ejs-layouts')
var { db } = require('./config/keys')
var session = require('express-session')
var flash = require('connect-flash')
var { test } = require('./config/passport')


test(passport)
var app = express()

mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log('Connecting to MongoDB.....');
}).catch((err) => {
    throw err
})

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())


app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success-msg')
    res.locals.error_msg = req.flash('error-msg')
    res.locals.error = req.flash('error')
    next()
})

app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use('/', require('./router/index'))
app.use('/users', require('./router/users'))

var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`you are listining on ${port}`);
})