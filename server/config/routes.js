var passport = require('passport'),
    GITHUB_CLIENT_ID = '426f5e6b58864fb3cc46',
    GITHUB_CLIENT_SECRET = 'b9b25d4d73e4986a6c3b75e09562df225d478e11',
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        User.findOne({
            id: profile._json.id
        }, function(err, user) {
            if (!err) {
                if (!user) {
                    var newuser = new User(profile._json);
                    newuser.save(function(err) {
                        if (!err) {
                        }
                    });
                }
            }
        });
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

    app.get('/success', function(req, res, next) {
        res.json('Successfully logged in.');
    });

    app.get('/error', function(req, res, next) {
        res.json("Error logging in.");
    });
};
