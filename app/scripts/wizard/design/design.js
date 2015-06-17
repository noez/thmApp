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
        templateUrl: 'views/wizard/design.html',
        controller: 'DesignCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .controller('DesignCtrl', ['$scope' ,'$sessionStorage', '$state','Products', 'UploadImage', 'UploadLabel', 'Matriz',function($scope, $sessionStorage,$state, Products, UploadImage, UploadLabel, Matriz){
    $scope.$storage = $sessionStorage;

    $scope.matriz = Matriz;

    // this step is valid initialize = false
    $scope.isValid = false;

    // labels is an array,
    // seeks in session, the index of the current cycle
    $scope.cycleIndex = $scope.$storage.order.cycle.index;

    // with the index found, access template label

    console.log($scope.$storage.order.labels);
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

    $scope.fontStacks = [
      {
        "name" : "Arial",
        "stack" : "sans-a"
      },
      {
        "name" : "Times New Roman",
        "stack" : "serif-a"
      },
      {
        "name" : "Comic Sans MS",
        "stack" : "sans-b"
      },
      {
        "name" : "Georgia",
        "stack" : "serif-b"
      }
    ];
    $scope.matriz.firstTl = "Texto Primario";
    $scope.matriz.secondTl = "Texto Secundario";
    $scope.matriz.font = $scope.fontStacks[0];

    // disable the following steps
    for (var i = 0; i < $scope.$storage.steps.length; i++) {
      if( i > 3) {
        $scope.$storage.steps[i].valid = false;
      }
    }

    if (_.has($scope.$storage.order.labels[$scope.cycleIndex-1], 'uploadImage')) {
      $scope.imageUploaded = $scope.$storage.order.labels[$scope.$storage.order.cycle.index - 1].uploadImage;
      $scope.labelImage = $scope.$storage.order.labels[$scope.$storage.order.cycle.index - 1].uploadImage;
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

        console.log(labelData);

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
            $scope.$storage.order.labels[$scope.$storage.order.cycle.index - 1].uploadImage = data;
            $scope.imageUploaded = $scope.$storage.order.labels[$scope.$storage.order.cycle.index - 1].uploadImage;
            $scope.labelImage = $scope.$storage.order.labels[$scope.$storage.order.cycle.index - 1].uploadImage;

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
