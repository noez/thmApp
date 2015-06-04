'use strict';
/**
* app.wizard.order Module
*
* Description
*/
angular.module('app.wizard.order',[])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('wizard.order',{
        url : '/order',
        templateUrl: 'views/wizard/order/order.html',
        controller : 'OrderCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('OrderCtrl', ['$scope', function($scope){

  }]);
