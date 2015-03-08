'use strict';

/**
 * @ngdoc function
 * @name listsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the listsApp
 */
angular.module('listsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
