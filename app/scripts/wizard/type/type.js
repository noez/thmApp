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

   .controller('TypeCtrl', ['$scope','Types', function($scope, Types){
      $scope.types = [];

      Types
        .getAll()
        .then(function(data){
          $scope.types = data;
        })
        .catch(function(err){
          console.log('error' + err);
        });
   }])
  ;
