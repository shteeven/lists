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

myApp.controller('AppCtrl', ['$scope', '$location', 'FBUserService', '$http', 'FB_URI',
  function($scope, $location, FBUserService, $http, FB_URI){
  $scope.authWaiting = true;
  var ref = new Firebase(FB_URI);


    FBUserService.currentUser().then(function(s){
      if (s){
        $scope.user = s;
        log(s);
        $scope.authWaiting = false;
      } else {$scope.authWaiting = false;}
    }, function(e){
      console.log(e);
    });

  function signIn(type, email, password){
    FBUserService.logIn(type);
  }
  function disconnectUser(access_token) {
    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token + '&callback=JSON_CALLBACK';
    $http.jsonp(revokeUrl)
      .success( function(nullResponse) {
        log('here');
        $scope.user = undefined;})
      .error(function(err) {console.log(err);});
  }
  function signOut(){
    ref.unauth();
    disconnectUser($scope.user.google.accessToken);
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


