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
        templateUrl: 'views/wizard/summary.html',
        controller: 'SummaryCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('SummaryCtrl', ['$scope', '$sessionStorage', '$state', '$cookies', '$window', 'Oscar', 'baseUrl',function($scope, $sessionStorage, $state, $cookies, $window ,Oscar, baseUrl){

    $scope.$storage = $sessionStorage;

    //get the maximum labels
    $scope.maxLabels = $scope.$storage.order.cycle.length;
    $scope.currentLabels = $scope.$storage.order.cycle.index-1;

    $scope.labels = $scope.$storage.order.labels;
    $scope.isAllowed = true;


    $scope.index = $scope.$storage.order.cycle.index;

    /*if ($scope.$storage.order.cycle.index -1 < $scope.$storage.order.cycle.length) {
      $scope.$storage.order.cycle.index = $scope.$storage.order.cycle.index + 1;
      $scope.isAllowed = true;
    }else {
      $scope.isAllowed = false;
    }*/

    $scope.continueDesigning = function() {

      var min = $scope.$storage.order.cycle.index,
        max = $scope.$storage.order.cycle.length;

      if (min < max ) {
        $scope.$storage.order.cycle.index++;
        $scope.isAllowed = true;
      }else {
        $scope.$storage.order.cycle.index = $scope.$storage.order.cycle.length;
        $scope.isAllowed = false;
      }

      if (!$scope.isAllowed) {
        alert('Has completado el número de etiquetas disponibles.');
      }else {
        $state.go('wizard.event');
      }
    };

    // order process data
    var labelsData = [];

    _.forEach($scope.labels, function(n) {
      var o = {
        template : n.template.id,
        label : n.processedLabel.id
      };
      labelsData.push(o);
    });

    var cartUrl = baseUrl.replace('api/' , 'basket/add/') + $scope.$storage.order.productId + '/';
    console.log(cartUrl);
    $scope.cart = {
      csrfmiddlewaretoken : $cookies.get('csrftoken'),
      quantity : $scope.$storage.order.qty
    };

    $scope.checkout = function () {

      Oscar
        .send(cartUrl,  $.param($scope.cart) )
        .then(function(res) {
          $window.location.href = "/checkout";
        })
        .catch(function(err) {
          console.log(err);
        });
    };


  }]);
