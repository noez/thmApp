'use strict';
/**
* app.wizard.type Module
*
* Description
*/
angular.module('app.wizard.type',[])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('wizard.type',{
        url : '/type',
        templateUrl: 'views/wizard/type/type.html',
        controller : 'TypeCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
   .controller('TypeCtrl', ['$scope','$sessionStorage','Types', function($scope, $sessionStorage, Types){
      // defines a empty collection
      $scope.types = [];
      $scope.typeSelected = {};

      // bind sessionStorage to a model
      $scope.$storage = $sessionStorage;

      // fetch and populate the types collection
      Types
        .getAll()
        .then(function(data){
          $scope.types = data;
        })
        .catch(function(err){
          console.log('error' + err);
        });

      // assigns the selected tequila
      $scope.selected = function(type) {
        // when tequila is chosen, you must be assigned.
        $scope.typeSelected = type;
        //
      };

   }])
  ;
