'use strict';
/**
 * app.blocks Module
 *
 * Description
 */
angular.module('app.blocks', [])

.directive('thTequilaCard', [function() {
  // Runs during compile
  return {
    restrict: 'A',
    scope: {
      type: '=tqType',
      size: '@tqSize',
      selected: '&tqSelected'
    },
    transclude: true,
    template: [
      '<div class="tq-card">',
      '<div class="tq-card__panel" ng-click="onSelectType(type);">',
      '<div class="tq-card__body">',
      '<img ng-src="{{ type.bimage }}" height="{{ size }}" />',
      '<h2 class="tq-card__name"> {{ type.name }}</h2>',
      '</div>',
      '</div>',
      '</div>'
    ].join(''),
    link: function(scope) {
      scope.onSelectType = function(type) {
        scope.selected(type);
      };
    }
  };
}])

.directive('thWizardStep', ['$compile', function($compile) {
  // Runs during compile
  return {
    restrict: 'E',
    scope: {
      ref: '@stepRef',
      valid: '=stepValid',
      step: '=step'
    },
    template: [
      '<a class="step">',
      '<span class="step__dot">{{ step.id }}</span>',
      '<span class="step__label">{{ step.label }}</span>',
      '</a>'
    ].join(''),
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      //listening changes
      scope.$watch('valid', function(bool) {
        if (bool) {
          element.attr('ui-sref', scope.ref);
          element.attr('ui-sref-active', 'active');
        } else {
          element.removeAttr('ui-sref');
          element.removeAttr('href');
        }
        $compile(element)(scope);
      });
    }
  };
}])

.directive('thCarousel', ['$timeout', function($timeout) {
  var carousel = null;
  return {
    restrict: 'A',
    scope: {
      source: '=thSource'
    },
    link: function(scope, element, attrs) {
      var isInitialized = false;
      carousel = element.children('.jcarousel');

      scope.$watch('source', function (newVal) {
        if (isInitialized) {
          carousel.jcarousel('reload');
        }else if (! _.isEmpty(newVal)) {
          $timeout(function(){
            carousel.jcarousel({});
          }, 0);
          isInitialized = true;
        }
      });
    },

    controller: ['$scope','$attrs', function ($scope, $attrs) {

      if($attrs.thCarousel) {$scope.$parent[$attrs.thCarousel] = this}

      this.next = function () {
        carousel.jcarousel('scroll', '+=1');
      };

      this.prev = function () {
        carousel.jcarousel('scroll', '-=1');
      };
    }]
  };
}])

.directive('thFileInput', ['$parse', function($parse){
  // Runs during compile
  return {
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    link: function(scope, element, attrs) {
      element.bind('change', function(){
        $parse(attrs.thFileInput)
          .assign(scope, element[0].files);
          scope.$apply();
      });
    }
  };
}])

.directive('thTransformImage', [ '$window', function($window){
  // Runs during compile
  return {
    scope: {
      image : '=thImage'
    },
    restrict: 'E',
    template: [
      '<div class="tfm">',
        '<div class="tfm-area"></div>',
          '<div class="tfm-inner">',
            '<div class="tfm-container>',
              '<div class="tfm-mask">',
                '<img ng-src="{{ image.file}}" class="tfm-image" />',
              '</div>',
              '<img ng-src="{{ image.file}}" class="tfm-image" />',
            '</div>',
          '</div>',
      '</div>'
    ].join(''),
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      var
        isInitialized = false,
        isTouchSupported = ('ontouchstart' in $window) || ($window.navigator.msPointerEnable) ? true : false,
        events = (isTouchSupported ? {
            start: 'touchstart',
            end: 'touchend',
            move: 'touchmove'
        } : {
            start: 'mousedown',
            end: 'mouseup',
            move: 'mousemove'
        });



      var transform = {
        init : function () {
          console.log('transform initialized');
          this.cache();
          return this;
        },
        reload : function () {

        },
        // cache the elements to work
        cache : function() {
          console.log('cache...');
          var self = this;
          self.dragArea = element.find('.tfm-area');
          self.dragImage = element.find('.tfm-image');
          self.dragMask = element.find('.tfm-mask');

          console.log(self);
        },
        rect : function () {
          return {

          };
        }
      };


      // listen if a new image has been uploaded
      scope.$watch('image', function (newVal){
        if (isInitialized) {
          transform.reload();
        }else if(!_.isUndefined(newVal) && ! _.isEmpty(newVal)){
          console.log(newVal);
          transform.init();
          isInitialized = true;
        }
      });


    }
  };
}]);




