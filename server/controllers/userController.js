var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
    return {
        displayAuth: function(req, res) {
            res.sendFile(path.join(__dirname, './../../client/index.html'));
        },
        getUser: function(req, res) {
            if (req.user) {
                res.json(req.user);
            } else {
                res.json(false);
            }
        },

        getUsers: function(req, res) {
            User.find({}, function (err, users) {
                if (err) {
                    console.log(err)
                } else {
                    res.json(users)
                }
            })
        },

        logOut: function(req, res) {
            req.logout();
            res.json(true);
        },

        getProfileUser: function(req, res) {
            User.findOne({id: req.params.id})
            .populate('questions')
            .populate('answers')
            .populate({
              path: 'answers',
              populate: {
                path: '_questions'
              }
            })
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
