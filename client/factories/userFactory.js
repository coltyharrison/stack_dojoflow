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
					g_User = user;
                    cb(user);
                }
                else {
                    $location.url('/');
                }
            });
        }
    };

    factory.getUsers = function(cb) {
        $http.get('/getUsers').then(function(output){
            if (output.data) {
                users = output.data
                cb(users);
            } 
        })
    }

    factory.logOut = function() {
        $http.get('/logOut')
        .then(function() {
            user = {};
			g_User = user;
            $location.url('/');
        });
    };

    factory.getProfileUser = function(id, cb) {
        $http.get('/getProfileUser/' + id)
        .then(function(output) {
            if (output.data) {
                cb(output.data);
            } else {
                $location.url('/dash');
                cb(false);
            }
        });
    };
    return factory;
});
