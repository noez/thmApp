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
  .controller('EventCtrl', ['$scope','Event', 'Template', function($scope, Event, Template){
    $scope.events = [];

    $scope.templates = [];

    $scope.carousel = {};

    //$scope.template = {};

    Event
      .get()
      .then(function(data) {
        $scope.events = data;
      })
      .catch(function(error) {
        console.log(error);
      });

    // when event is chosen, fetch the templares whit event id.
    $scope.getTemplates = function(eventId) {
      console.log('id : ' + eventId);
      Template
        .get(eventId)
        .then(function(data) {
          $scope.templates = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    $scope.evtSaluda = function (msg) {
      console.log(msg);
    };

    // when templare is selected must be assigned
    $scope.onSelectTemplate = function (tpl) {
      console.log(tpl );
    };
  }]);
