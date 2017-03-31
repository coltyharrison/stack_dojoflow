var app = angular.module('app', ['ngRoute', 'wiz.markdown']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/auth.html',
    })
    .when('/dash', {
        templateUrl: 'partials/dashboard.html',
        controller: 'questionController'
    })
    .when('/question/:id', {
        templateUrl: 'partials/question.html',
        controller: 'questionController'
    })
    .when('/add_question',{
        templateUrl: 'partials/add.html',
        controller: 'questionController'
    })
    .when('/topic/:topic', {
        templateUrl: 'partials/topic.html',
        controller: 'questionController'
    })
    .when('/user/:userid', {
        templateUrl: 'partials/user.html',
        controller: 'userController'
    })
    .when('/easter', {
        templateUrl: 'partials/easter.html',
        controller: 'questionController'
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
})
.directive('enavBar', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/easternav.html'
    };
})
.directive('footer', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/footer.html'
    };
})
