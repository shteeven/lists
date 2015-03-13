'use strict';

/**
 * @ngdoc function
 * @name listsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listsApp
 */
var app = angular.module('listsApp');

app.controller('MainCtrl', ['$scope', 'ListsFBService', function ($scope, ListsFBService) {

  var LFBS = ListsFBService;

  function addItem(item){
    LFBS.createItem(item);
  }
  $scope.ourList = [];
  $scope.ourObj = {};
  function getList(){
    $scope.list = LFBS.getList();
    $scope.list.$loaded().then(function(x){
      angular.forEach(x, function(value, key) {
        $scope.log(value);
        $scope.log(key);
        this.push(key + ': ' + value);
      }, $scope.ourList);
    });
  }
  function getObj(){
    $scope.obj = LFBS.getObj();
    $scope.obj.$loaded().then(function(x){
      angular.forEach(x, function(value, key) {
        $scope.log(value);
        $scope.log(key);
        this.push(key + ': ' + value);
      }, $scope.ourObj);
    });
  }



  getObj();
  getList();

  }]);
