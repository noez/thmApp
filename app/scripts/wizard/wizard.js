'use strict';
/**
* app.wizard Module
*
* Description
* Wizard module for application.
*/
angular.module('app.wizard', ['app.wizard.type','app.wizard.order'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard',{
        url : '/wizard',
        templateUrl: 'views/wizard/wizard.html',
        controller: 'WizardCtrl'
      });
    $urlRouterProvider.otherwise('/wizard/type');
  }])
  .controller('WizardCtrl', ['$scope', function($scope){
    $scope.steps = [{
      id: 1,
      url: 'type',
      label: 'Tequila',
      valid: true
    }, {
      id: 2,
      url: 'order',
      label: 'Pedido',
      valid: false
    }, {
      id: 3,
      url: 'event',
      label: 'Evento',
      valid: false
    }, {
      id: 4,
      url: 'design',
      label: 'Diseño',
      valid: false
    }, {
      id: 5,
      url: 'summary',
      label: 'Resumen',
      valid: false
    }];

    $scope.validations = [];

  }])
  ;
