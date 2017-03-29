app.controller('userController', function(userFactory, $scope) {
    $scope.user = {};
    $scope.getUser = function() {
        userFactory.getUser(function(user) {
            $scope.user = user;
        });
    };
    $scope.getUser();
});
