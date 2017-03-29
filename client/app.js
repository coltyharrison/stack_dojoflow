var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/auth.html',
    })
    .when('/dash', {
        templateUrl: 'partials/dashboard.html',
        controller: 'questionController'
    })
    .when('/add_question',{
        templateUrl: 'partials/add.html',
        controller: 'questionController'
    })
    .when('/topic/:id', {
        templateUrl: 'partials/topic.html',
    })
    .when('/user/:userid', {
        templateUrl: 'partials/user.html',
        controller: 'userController'
    })
    .otherwise({
        redirectTo: '/'
    });
})
.directive('navBar', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/navbar.html'
    };
});
