'use strict';

/**
 * Created by Shtav on 3/11/15.
 */

var app = angular
  .module('listsApp');

app.controller('AppCtrl', ['$scope', '$location', 'UserFBService', function($scope, $location, UserFBService){
  $scope.authWaiting = true;
  UserFBService.currentUser();

  var authObj = UserFBService.authObj();
  authObj.$onAuth(function(authData) {
    $scope.user = authData;
  });

  function signIn(type, email, password){
    UserFBService.logIn(type);
  }
  function signOut(){
    UserFBService.signOut();
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