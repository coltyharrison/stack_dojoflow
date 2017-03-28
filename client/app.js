console.log('sjkdhsa');
var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/auth.html',
    })
    .when('/topic/:id', {
        templateUrl: 'partials/topic.html',
    })
    .otherwise({
        redirectTo: '/'
    });
});
