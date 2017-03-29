app.factory('userFactory', function($http, $location) {
    var factory = {};
    var user = {};
    factory.getUser = function(cb) {
        if (Object.keys(user).length > 0) {
            cb(user);
        } else {
            $http.get('/getUser')
            .then(function(output) {
                if (output.data) {
                    user = output.data;
                    cb(user);
                }
                else {
                    $location.url('/');
                }
            });
        }
    };
    return factory;
});
