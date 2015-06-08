'use strict';
/**
* app.wizard Module
*
* Description
* Wizard module for application.
*/
angular
  .module('app.wizard', [
    'app.wizard.type',
    'app.wizard.order',
    'app.wizard.event',
    'app.wizard.design'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard',{
        url : '/wizard',
        abstract: true,
        templateUrl: 'views/wizard/wizard.html',
        controller: 'WizardCtrl'
      });
    $urlRouterProvider.otherwise('/wizard/type');
  }])

  .controller('WizardCtrl', ['$scope', '$rootScope','$state', '$sessionStorage', function($scope, $rootScope,$state, $sessionStorage){

    $scope.$storage = $sessionStorage;

    // default steps
    var defaultSteps = [{
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

    // ui-sref prefix
    prefix = 'wizard.';

    if(_.isEmpty($scope.$storage.steps)) {
      $scope.$storage.steps = defaultSteps;
    }

    // validate if steps in session exists
    /*if(_.isEmpty($scope.$storage.steps) && (!_.isNull($scope.$storage.steps) || !_.isUndefined($scope.$storage.steps))){

    }*/

    // listen for changes in the ui router states
    /*$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){

      // get the ref from to ui router state
      var stateRef = toState.name.split('.')[1];
      console.log(toState);
      // finds the index of the state
      var indexState = _.findIndex($scope.$storage.steps, function (step) {
        return step.ref === stateRef;
      });

      // blocks the states whose indices are less than the index found
      _.forEach($scope.$storage.steps, function(n, key) {
        if(indexState < key) {
          n.valid = false;
        }
      });
    });*/

    // listen for changes in the steps
    $scope.$on('stepChange', function(event, step ){
      if(step.isValid) {
        // enable next step in the process
        $scope.$storage.steps[step.index + 1].valid = true;
        // go to the next step in the process
        $state.go(prefix + $scope.$storage.steps[step.index + 1].ref);
      }
    });

  }]);
