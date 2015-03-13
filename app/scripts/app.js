'use strict';

/**
 * @ngdoc overview
 * @name listsApp
 * @description
 * # listsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('listsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ui.router'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.constant('FB_URI', 'https://fiery-torch-1810.firebaseIO.com/');

app.run(['$rootScope', '$firebase', '$firebaseAuth', 'FB_URI', function ($rootScope, $firebase, $firebaseAuth, FB_URI) {
  $rootScope.ref = new Firebase(FB_URI);
  $rootScope.listRef = new Firebase(FB_URI+'/lists');
  $rootScope.auth = $firebaseAuth($rootScope.ref);
}]);


