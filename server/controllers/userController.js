var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
    return {
        getUser: function(req, res) {
            if (req.session.passport) {
                res.json(req.session.passport.user._json);
            } else {
                res.json(false);
            }
        }
    };
})();
