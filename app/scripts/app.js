'use strict';

/**
 * @ngdoc overview
 * @name listsApp
 * @description
 * # listsApp
 *
 * Main module of the application.
 */
var myApp = angular
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
  ])
  .config(function ($routeProvider) {
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

myApp.constant('FB_URI', 'https://fiery-torch-1810.firebaseIO.com/');

myApp.controller('AppCtrl', ['$scope', '$location', 'FBUserService', '$http', '$rootScope', 'FB_URI', '$firebaseAuth', function($scope, $location, FBUserService, $http, $rootScope, FB_URI, $firebaseAuth){
  $scope.authWaiting = true;
  FBUserService.currentUser();

  var authObj = FBUserService.authObj();
  authObj.$onAuth(function(authData) {
    $scope.user = authData;
  });

  function signIn(type, email, password){
    FBUserService.logIn(type);
  }
  function signOut(){
    FBUserService.signOut();
    $scope.user = undefined;
  }
  function isActive(viewLocation) {
    return (viewLocation === $location.path());
  }
  function log(m){
    console.log(m);
  }

  $scope.signIn = signIn;
  $scope.log = log;
  $scope.isActive = isActive;
  $scope.signOut = signOut;

}]);


