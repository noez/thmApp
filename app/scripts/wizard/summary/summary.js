'use strict';
/**
 * app.wizard.summary Module
 *
 * Description
 */
angular
  .module('app.wizard.summary',[])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.summary', {
        url: '/summary',
        templateUrl: 'views/wizard/summary/summary.html',
        controller: 'SummaryCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('SummaryCtrl', ['$scope', '$sessionStorage', '$state', '$cookies', 'Oscar', function($scope, $sessionStorage, $state, $cookies, Oscar){

    $scope.$storage = $sessionStorage;

    //get the maximum labels
    $scope.maxLabels = $scope.$storage.order.cycle.length - $scope.$storage.order.cycle.index + 1;
    $scope.labels = $scope.$storage.order.labels;
    $scope.isAllowed = true;

    $scope.continueDesigning = function() {
      var min = $scope.$storage.order.cycle.index,
      max = $scope.$storage.order.cycle.length;

      if (min < max) {
        $scope.$storage.order.cycle.index += 1;
        $scope.isAllowed = true;
      }else {
        $scope.isAllowed = false;
      }

      if ($scope.isAllowed) {
        $state.go('wizard.event');
      }
    };

    // order process data
    var labelsData = [];

    _.forEach($scope.labels, function(n, key) {
      var o = {
        template : n.template.id,
        label : n.processedLabel.id
      };
      labelsData.push(o);
    });

    var
      cartUrl = 'http://192.168.1.14:8000/basket/add/' + $scope.$storage.order.productId + '/';
    $scope.cart = {
      csrfmiddlewaretoken : 'InJJliexGwdAyB1X5ZQwC32KNWLF20JE',
      quantity : $scope.$storage.order.qty
    };

    $scope.checkout = function () {
      Oscar
        .send(cartUrl ,  $.param($scope.cart) )
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    };


  }]);
