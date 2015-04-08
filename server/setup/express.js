var path = require('path'),
    serve = require('serve-static'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    router = require('../routes/');

module.exports = function(app, passport) {

    // serve files
    app.use(compress());
    app.use('/static/lib', serve(path.join(__dirname, '../../public/lib')));
    app.use('/static', serve(path.join(__dirname, '../../public/src/')));

    // session
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cookieSession({
        key: C.SERVER.COOKIE.key,
        secret: C.SERVER.COOKIE.SECRET,
        cookie: { maxAge: C.SERVER.COOKIE.MAXAGE }
    }));

    // passport
    app.use(passport.initialize());
    app.use(passport.session());

    // add dynamic routes
    app.use(router);

    app.get('*' , function(req, res, next){
        res.render('__dirname' + "/../../views/index.ejs");
    });

    // listen for unmatched routes
    app.use(function(req, res) {
        Log.warn('Unmatched route: %s', req.url);
        res.sendStatus(404);
    });

    // listen for uncaught router errors
    app.use(function(err, req, res, next) {
        Log.error(err.stack);
        res.sendStatus(500);
    });
}
