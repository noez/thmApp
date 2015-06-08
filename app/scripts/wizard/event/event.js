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
  .controller('EventCtrl', ['$scope', '$sessionStorage','Event', 'Template', function($scope, $sessionStorage, Event, Template){
    $scope.$storage = $sessionStorage;
    $scope.events = [];
    $scope.templates = [];
    $scope.isValid = true;

    $scope.carousel;

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

    var labelsLen = $scope.$storage.order.labels.length,
        currentIndex = $scope.$storage.order.cycle.index;

    if (currentIndex === labelsLen) {
      $scope.$storage.order.labels.pop();
    }

    $scope.chooseTemplate = function (template) {
      var round = {
        template : template,
        uploadImage : null,
        render : null,
        headlines: []
      };

      $scope.$storage.order.labels.push(round);
      $scope.$emit('stepChange', {
        index : 2,
        isValid : $scope.isValid
      });
    };

  }]);
