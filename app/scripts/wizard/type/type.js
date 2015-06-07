'use strict';
/**
 * app.wizard.type Module
 *
 * Description
 */
angular.module('app.wizard.type', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.type', {
        url: '/type',
        templateUrl: 'views/wizard/type/type.html',
        controller: 'TypeCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('TypeCtrl', ['$scope', '$sessionStorage', 'Types', function($scope, $sessionStorage, Types) {

    // define empty collection of types
    $scope.types = [];

    // type of tequila initialized empty object
    $scope.typeSelected = {};

    // id tequila, initialized null
    $scope.typeId = null;

    // bind sessionStorage to a model
    $scope.$storage = $sessionStorage;

    $scope.isValid = false;

    $scope.$storage.data = {};
    $scope.$storage.order = {};

    // fetch and populate the types collection
    Types
      .getAll()
      .then(function(data) {
        $scope.types = data;
      })
      .catch(function(err) {
        console.log('error' + err);
      });

    // when tequila is chosen, you must be assigned.
    $scope.selected = function(type) {
      console.log(type);
      // assigns the selected tequila
      $scope.typeSelected = type;
      $scope.typeId = type.id;

      // validations

      if (!_.isNull($scope.typeId) && !_.isUndefined($scope.typeId)) {
        if (_.isString($scope.typeId)) {
          parseInt($scope.typeId, 10);
          return;
        }
      }

      // save in session, the id of the type of tequila
      $scope.$storage.data.typeId = $scope.typeId;

      if (!_.isNull($scope.$storage.data.typeId) && !_.isUndefined($scope.$storage.data.typeId)) {
        $scope.isValid = true;
      } else {
        $scope.isValid = false;
      }

      //
      $scope.$emit('stepChange', {
        index: 0,
        isValid: true
      });

    };

  }]);
