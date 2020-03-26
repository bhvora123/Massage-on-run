var app = angular.module('MassageApp', ['ngRoute', 'ui.bootstrap', 'ngAutocomplete', 'ngCookies']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).
        when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/signUp.html',
            controller: 'SignUpCtrl'
        }).
        when('/booking', {
            templateUrl: 'partials/booking.html',
            controller: 'BookingCtrl'
        }).
        when('/profile/:userId', {
            templateUrl: 'partials/profile.html',
            controller: 'ProfileCtrl'
        }).
        when('/review', {
            templateUrl: 'partials/review.html',
            controller: 'ReviewCtrl'
        }).

        otherwise({
            redirectTo: '/'
        })
}]);