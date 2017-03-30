var passport = require('passport'),
    GITHUB_CLIENT_ID = '426f5e6b58864fb3cc46',
    GITHUB_CLIENT_SECRET = 'b9b25d4d73e4986a6c3b75e09562df225d478e11',
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    GitHubStrategy = require('passport-github').Strategy,
    users = require('./../controllers/userController.js'),

    // Backend question controller, to handle question and question comments
    questionController = require('./../controllers/questionController.js');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({id: id}, function(err, user) {
        done(err, user);
    });
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
    User.update({id: profile._json.id}, {$set: profile._json},
    function(err, foundUser) {
        if (!err) {
            if (foundUser.n === 0) {
                var newuser = new User(profile._json);
                if (profile.name === '') {
                    profile.name = profile.login;
                }
                newuser.save(function(err) {
                    if (!err) {
                        return done(null, newuser);
                    }
                });
            } else {
                User.findOne({id: profile.id}, function(err, user) {
                    return done(null, user);
                });
            }
        }
    });
}));
module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/', function(req, res) {
        users.displayAuth(req, res);
    });
    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/success',
        failureRedirect: '/error'
    }));

    app.get('/getQuestions', function(req, res){
      questionController.getQuestions(req, res);
    });

    app.post('/createQuestion', function(req, res){
      questionController.createQuestion(req, res);
    });

    app.post('/createComment', function(req, res) {
      questionController.createComment(req, res)
    });

    app.post('/createAnswer', function(req, res) {
      questionController.createAnswer(req, res)
    })

    app.post('/createAnswerComment', function(req, res) {
      questionController.createAnswerComment(req, res)
    })

    app.post('/qUpvote', function(req, res) {
      questionController.qUpvote(req, res);
    });

    app.post('/qDownvote', function(req, res) {
      questionController.qDownvote(req, res);
    });

    app.post('/aUpvote', function(req, res) {
      questionController.aUpvote(req, res);
    });

    app.post('/aDownvote', function(req, res) {
      questionController.aDownvote(req, res);
    });

    app.get('/success', function(req, res, next) {
        res.redirect('/#!/dash');
    });

    app.get('/error', function(req, res, next) {
        console.log('error')
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
