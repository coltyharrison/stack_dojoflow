app.controller('userController', function(userFactory, $scope) {
    $scope.user = {};
    $scope.getUser = function() {
        userFactory.getUser(function(user) {
            if (user) {
                $scope.user = user;
            }
        });
    };
    $scope.logOut = function() {
        userFactory.logOut()
        $scope.user = {};
    }
    $scope.getUser();
});
