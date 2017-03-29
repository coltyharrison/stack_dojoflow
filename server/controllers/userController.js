var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
    return {
        getUser: function(req, res) {
            if (req.user) {
                res.json(req.session.passport.user._json);
            } else {
                res.json(false);
            }
        },

        logOut: function(req, res) {
            req.logout();
            res.json(true);
        },

        getProfileUser: function(req, res) {
            User.findOne({id: req.params.id})
            .populate('questions')
            .populate('answers')
            .populate('comments')
            .populate('favorites')
            .exec(function(err, user) {
                if (!err) {
                    res.json(user);
                } else if (!user) {
                    res.json(false);
                }
            });
        }
    };
})();
