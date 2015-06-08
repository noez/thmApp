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
   .controller('HomeCtrl', ['$scope', '$sessionStorage', '$state', function($scope, $sessionStorage, $state){
      $scope.$storage = $sessionStorage;
      $scope.$storage.steps = {};
      console.log($scope.$storage);
      $scope.slides = [{
      heading: 'Tu Momento Especial',
      text: 'Porque siempre hay esa canción, aroma, lugar que lo revive.',
      image: 'images/slides/1.jpg',
      action: 'Comience ahora',
      position: 'top-left'
    }, /*{
      heading: 'Transfórmalo',
      text: 'Esa fotografía tomada por el corazón.',
      image: 'images/slides/2.jpg',
      action: 'No esperes más',
      position: 'top-right'
    },*/ {
      heading: 'A un Recuerdo Eterno',
      text: 'Conservar es asegurar que no se olvide.',
      image: 'images/slides/3.jpg',
      action: 'Envíe su pedido hoy',
      position: 'top-right'
    }];

    $scope.startCustomizing = function () {
      $state.go('wizard.type');
    };

   }])
  ;
