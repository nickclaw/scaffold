var router = require('express').Router(),
    passport = require('passport'),
    socket = require('../../setup/socket.io.js');

//
// Login routes
//
router
    .get('/login', passport.authenticate('facebook-login'))
    .get('/login/callback', passport.authenticate('facebook-login'),
    function(req, res, next) {
        res.redirect('/');
    });

//
// Signup routes
//
router
    .get('/signup', passport.authenticate('facebook-signup'))
    .get('/signup/callback', passport.authenticate('facebook-signup'),
    function(req, res, next) {

        setTimeout(function() {
            socket.notify(req.user.id, {
                text: 'Welcome to Scaffold',
                description: "We're glad you joined! You can click here to learn a little bit more about how you can use Scaffold.",
                url: '/about'
            })
        }, 5000);

        res.redirect('/signup');
    });

module.exports = router;
