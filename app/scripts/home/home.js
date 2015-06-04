'use strict';
/**
* app.home Module
*
* Description
* Home module for app
*/
angular
  .module('app.home', [])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('home',{
        url : '/',
        templateUrl: 'views/home.html',
        controller : 'HomeCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])

  /**
   * @ngdoc function
   * @name app.home.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the app.home
   */
   .controller('HomeCtrl', ['$scope', function($scope){
      $scope.title = 'HomeCtrl';
      console.log('run -> ' + $scope.title);
   }])
  ;
