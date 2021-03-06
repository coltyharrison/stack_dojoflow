app.controller('userController', function(userFactory, $scope, $routeParams) {
    $scope.user = {};
    $scope.profileUser = {};

    $scope.getUser = function() {
        userFactory.getUser(function(user) {
            if (user) {
                $scope.user = user;
            }
        });
    };
    $scope.logOut = function() {
        userFactory.logOut();
        $scope.user = {};
    };
    $scope.getUser();

    var getUsers = function() {
        userFactory.getUsers(function(users) {
            if (users) {
                $scope.users = users;
            }
        });
    };
    getUsers();

    function getProfileUser(id) {
        userFactory.getProfileUser(id, function(user) {
            if (user) {
                console.log(user);
                $scope.profileUser = user;
            }
        });
    }
    if ($routeParams.userid) {
        getProfileUser($routeParams.userid);
    }
});
