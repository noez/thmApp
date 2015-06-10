'use strict';
/**
 * app.wizard.order Module
 *
 * Description
 */
angular
  .module('app.wizard.order', [])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.order', {
        url: '/order',
        templateUrl: 'views/wizard/order/order.html',
        controller: 'OrderCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])

  .controller('OrderCtrl', ['$scope', '$sessionStorage', 'Products', 'Price', function($scope, $sessionStorage, Products, Price) {

    var defaultQty = 1;

    // initialize models
    $scope.$storage = $sessionStorage;
    $scope.products = [];
    $scope.product = {};
    $scope.qty = ( _.has($scope.$storage.order, 'qty')) ? $scope.$storage.order.qty : defaultQty;

    $scope.isValid = false;

    // disable the following steps
    for (var i = 0; i < $scope.$storage.steps.length; i++) {
      if( i > 1) {
        $scope.$storage.steps[i].valid = false;
      }
    }

    // fetch and populate the products collection
    Products
      .getAll($scope.$storage.data.typeId)
      .then(function(data) {
        $scope.products = data;
        if (!_.isNull($scope.$storage.order) && !_.isUndefined($scope.$storage.order)) {
          var productIndex = _.findIndex($scope.products, function (product){
            return product.id === $scope.$storage.order.productId;
          });
          $scope.product = $scope.products[productIndex];
        }
      })
      .catch(function(err) {
        console.log('error' + err);
      });

    // llistening changes , product model
    $scope.$watch('product', function(product) {

      // validate product value
      if (!_.isEmpty(product)) {
        // fetch the price of the selected product
        Price
          .get(product.id)
          .then(function(data) {
            $scope.productPrice = data[0];
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });

    $scope.saveOrder = function () {

      if (_.isNull($scope.$storage.order) || _.isUndefined($scope.$storage.order)) {
        $scope.$storage.order = {};
        $scope.isValid = false;
      }

      if (!_.isNull($scope.product.id) && !_.isUndefined($scope.product.id)) {
        $scope.$storage.order.productId = $scope.product.id;
        $scope.$storage.order.qty = $scope.qty;

        // create the cyclye
        $scope.$storage.order.cycle = {
          index: 1,
          length : $scope.qty * $scope.product.maxlabels
        };

        $scope.$storage.order.labels = [];

        $scope.$storage.order.price =  {
          value : $scope.productPrice.price_excl_tax,
          currency : $scope.productPrice.price_currency
        };

      $scope.isValid = true;
      }else {
        $scope.isValid = false;
      }

      $scope.$emit('stepChange', {
        index: 1,
        isValid: $scope.isValid
      });

    };
  }]);
