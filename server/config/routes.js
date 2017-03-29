var passport = require('passport'),
    GITHUB_CLIENT_ID = '426f5e6b58864fb3cc46',
    GITHUB_CLIENT_SECRET = 'b9b25d4d73e4986a6c3b75e09562df225d478e11',
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    GitHubStrategy = require('passport-github').Strategy,
    users = require('./../controllers/userController.js'),
    questionsession = require('./../controllers/dashController.js');

    // Backend question controller, to handle question and question comments
    questionController = require('./../controllers/questionController.js')

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.findOne({
        id: user.id
    }, function(err, foundUser) {
        if (!err) {
            if (!foundUser) {
                var newuser = new User(user._json);
                newuser.save(function(err) {
                    if (!err) {
                        return done(null, newuser);
                    }
                });
            } else {
                return done(null, foundUser);
            }
        }
    });
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));
module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, './../../client/index.html'));
    });
    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/success',
        failureRedirect: '/error'
    }));

    // app.get('/getquestions', function(req, res){
    //   questionsession.getquestions(req, res);
    // });
    //
    // app.post('/createQuestion', function(req, res){
    //   questionsession.create(req, res);
    // });

    app.get('/getQuestions', function(req, res){
      questionController.getQuestions(req, res);
    });

    app.post('/createQuestion', function(req, res){
      questionController.createQuestion(req, res);
    });

    app.post('/createComment', function(req, res) {
      questionController.createComment(req, res)
    });

    app.get('/success', function(req, res, next) {
        res.redirect('/#!/dash');
    });

    app.get('/error', function(req, res, next) {
        res.redirect('/');
    });

    app.get('/getUser', function(req, res) {
        users.getUser(req, res);
    });

    app.get('/logOut', function(req, res) {
        users.logOut(req, res);
    });

    app.get('/getProfileUser/:id', function(req, res) {
        users.getProfileUser(req, res);
    });
};
