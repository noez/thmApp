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

    $scope.$storage = $sessionStorage;

    $scope.products = [];
    $scope.product = {};
    $scope.qty = ( _.has($scope.$storage.order, 'qty')) ? $scope.$storage.order.qty : defaultQty;

    $scope.isValid = false;
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

    // see if the product model change
    $scope.$watch('product', function(product) {
      if (!_.isEmpty(product)) {
        // get the product id
        var productId = product.id;
        Price
          .get(productId)
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
