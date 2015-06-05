'use strict';
/**
* app.wizard Module
*
* Description
* Wizard module for application.
*/
angular.module('app.wizard', [
  'app.wizard.type',
  'app.wizard.order',
  'app.wizard.event'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard',{
        url : '/wizard',
        templateUrl: 'views/wizard/wizard.html',
        controller: 'WizardCtrl'
      });
    $urlRouterProvider.otherwise('/wizard/type');
  }])
  .controller('WizardCtrl', ['$scope', '$rootScope','$state', '$sessionStorage', function($scope, $rootScope,$state, $sessionStorage){

    $scope.$storage = $sessionStorage;

    // steps defaults
    var
      defaultSteps = [{
      id: 1,
      ref: 'type',
      label: 'Tequila',
      valid: true
    }, {
      id: 2,
      ref: 'order',
      label: 'Pedido',
      valid: false
    }, {
      id: 3,
      ref: 'event',
      label: 'Evento',
      valid: false
    }, {
      id: 4,
      ref: 'design',
      label: 'Diseño',
      valid: false
    }, {
      id: 5,
      ref: 'summary',
      label: 'Resumen',
      valid: false
    }],
    prefix = 'wizard.';


    if(_.isNull($scope.$storage.steps) || _.isUndefined($scope.$storage.steps)){
      $scope.$storage.steps = defaultSteps;
    }

    $rootScope.$on('$stateChangeStart', function(event, toState){
      var
        stateRef = toState.name.split('.')[1],
        indexState = _.findIndex($scope.$storage.steps, function (step) {
        return step.ref === stateRef;
      });

      _.forEach($scope.$storage.steps, function(n, key) {
        if(indexState < key) {
          n.valid = false;
        }
      });

    });


    $scope.$on('stepChange', function(event, step ){
      if(step.isValid) {
        // setear el step.index a $storage.stepIndex
        $scope.$storage.steps[step.index + 1].valid = true;
        console.log(prefix + $scope.$storage.steps[step.index + 1].ref);
        $state.go(prefix + $scope.$storage.steps[step.index + 1].ref);
      }
    });

  }])
  ;
