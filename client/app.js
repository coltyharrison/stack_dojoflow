var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/auth.html',
    })
    .when('/dash', {
        templateUrl: 'partials/dashboard.html',
        controller: 'dashController'
    })
    .when('/add_question',{
        templateUrl: 'partials/add.html',
        controller: 'dashController'
    })
    .when('/topic/:id', {
        templateUrl: 'partials/topic.html',
    })
    .otherwise({
        redirectTo: '/'
    });
});
