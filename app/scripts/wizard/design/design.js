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
  .controller('DesignCtrl', ['$scope' ,'$sessionStorage', '$state','Products', 'UploadImage','Types', 'UploadLabel',function($scope, $sessionStorage,$state, Products, UploadImage, Types, UploadLabel){
    $scope.$storage = $sessionStorage;

    // this step is valid initialize = false
    $scope.isValid = false;

    // labels is an array,
    // seeks in session, the index of the current cycle
    $scope.cycleIndex = $scope.$storage.order.cycle.index;

    // with the index found, access template label
    $scope.template = $scope.$storage.order.labels[$scope.cycleIndex-1].template;

    // model label containing rendered in base64
    // this controller watch this labelRender model
    $scope.labelRender = undefined;

    // flag, which controls whether or not you can run the rendering
    // the directive watch this flag
    $scope.labelBuild = false;

    // rendering is performed based on the flag
    $scope.toRender = function() {
      $scope.labelBuild = true;

    };

    // disable the following steps
    for (var i = 0; i < $scope.$storage.steps.length; i++) {
      if( i > 3) {
        $scope.$storage.steps[i].valid = false;
      }
    }

    // if a processed tag exists, delete it
    if( _.has($scope.$storage.order.labels[$scope.cycleIndex-1] , 'processedLabel')) {
      delete $scope.$storage.order.labels[$scope.cycleIndex-1].processedLabel;
      console.log('etiqueta eliminada..sorry x(');
    }

    // watch the model changes
    $scope.$watch('labelRender', function(newVal) {
      if (!_.isUndefined(newVal) && !_.isNull(newVal)) {

        // if this validation passes
        // creates the rendered tag data to be sent to the server
        var labelData = {
          uploadimage : $scope.labelImage.id,
          label : $scope.labelRender,
          name : ''
        };

        // send labe to the server
        UploadLabel
          .send(labelData)
          .then(function(data) {
            if (!_.isEmpty(data)&& !( _.isNull(data) || _.isUndefined(data) ) ){
              $scope.processedLabel = data;
              $scope.$storage.order.labels[$scope.cycleIndex-1].processedLabel = $scope.processedLabel;
              $scope.isValid = true;
            }else {
              $scope.isValid = false;
            }

            $scope.$emit('stepChange', {
              index: 3,
              isValid: $scope.isValid
            });

          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });

    // get the tag
    Types
      .getById( $scope.$storage.data.typeId)
      .then(function( data ) {
        $scope.type = data;
      })
      .catch(function (error){
        console.log(error);
      });

    // get the product
    Products.getById( $scope.$storage.order.productId )
      .then(function( data ) {
        $scope.product = data;
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
            $scope.uploadImage = data;
            $scope.labelImage = data;
          })
          .catch(function (err) {
            console.log(err);
          });
      }else {
        alert('error upload image required');
        $scope.isValid = false;
      }

    };



  }]);
