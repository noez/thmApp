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
  .controller('DesignCtrl', ['$scope' ,'$sessionStorage', 'Products', 'UploadImage','Types',function($scope, $sessionStorage, Products, UploadImage, Types){
    $scope.$storage = $sessionStorage;
    var cycleIndex = $scope.$storage.order.cycle.index;

    $scope.design = {
      template : $scope.$storage.order.labels[cycleIndex-1].template,
      transform : {
        x : 0 ,
        y : 0,
        width : 0,
        height : 0
      }
    };

    // get the tag

    Types
      .getById( $scope.$storage.data.typeId)
      .then(function( data ) {
        $scope.design.type = data;
      })
      .catch(function (error){
        console.log(error);
      });

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

      if (!_.isUndefined($scope.files) && !_.isNull($scope.files)) {
        UploadImage
          .file(fd)
          .then(function(data) {
            $scope.design.uploadImage = data;
            $scope.design.labelImage = data;
          })
          .catch(function (err) {
            console.log(err);
          });
      }else {
        alert('error upload image required');
      }

    };



  }]);
