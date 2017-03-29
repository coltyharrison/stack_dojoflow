var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
    return {
        getUser: function(req, res) {
            User.findOne({
                id: req.session.passport.user.id
            }, function(err, user) {
                if (!err) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.json(false);
                    }
                }
            });
        }
    };
})();
