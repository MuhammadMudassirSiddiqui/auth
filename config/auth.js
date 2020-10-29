var ensureAuthenticate = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'kindly logIn to access this route')
    res.redirect('/users/login')
}

module.exports = {
    ensureAuthenticate
}