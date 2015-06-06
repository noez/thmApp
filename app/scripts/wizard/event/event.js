'use strict';
/**
 * app.wizard.event Module
 *
 * Description
 */
angular
  .module('app.wizard.event', [])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.event', {
        url: '/event',
        templateUrl: 'views/wizard/event/event.html',
        controller: 'EventCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('EventCtrl', ['$scope', function($scope){

  }]);
