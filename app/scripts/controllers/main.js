'use strict';

/**
 * @ngdoc function
 * @name listsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the listsApp
 */
angular.module('listsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
