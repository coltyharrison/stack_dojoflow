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

    function getProfileUser() {
        userFactory.getProfileUser(function(user) {
            $scope.profileUser = user;
        });
    };
    if ($routeParams.userid) {
        getProfileUser();
    }
});
