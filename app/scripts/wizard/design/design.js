'use strict';
/**
 * app.wizard.design Module
 *
 * Description
 */
angular
  .module('app.wizard.design', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard.design', {
        url: '/design',
        templateUrl: 'views/wizard/design/design.html',
        controller: 'DesignCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('DesignCtrl', ['$scope' ,'$sessionStorage', 'Products', 'UploadImage',function($scope, $sessionStorage, Products, UploadImage){
    $scope.$storage = $sessionStorage;

    $scope.design = {
    };

    // get the product
    Products.getById( $scope.$storage.order.productId )
      .then(function( data ) {
        $scope.design.product = data;
      })
      .catch(function (error){
        console.log(error);
      });

    // logic upload image
    $scope.uploadImage = function () {
      var fd = new FormData();

      angular.forEach($scope.files, function (file) {
        fd.append('file', file);
      });
      UploadImage
        .file(fd)
        .then(function(data) {
          $scope.design.uploadImage = data;
        })
        .catch(function (err) {
          console.log(err);
        });
    };



  }]);
