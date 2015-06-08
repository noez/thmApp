'use strict';
/**
 * app.blocks Module
 *
 * Description
 */
angular.module('app.blocks', [])

.directive('hsBackSlider', ['$timeout', function($timeout){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      source : '=',
      options : '='
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    //replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function(scope, element, attrs) {
      var backslider = null,
        defaultOptions = {
          mode: 'timer',
        effect: 'slidefade',
        effectTime: 1500,
        timerDelay: 10000,
        centerImages: true
      };

      if (!_.isEmpty(scope.options)) {
        angular.extend(defaultOptions, scope.options);
      }

      scope.$watch('source', function(newVal) {
        if(!_.isEmpty(newVal) || ( !_.isUndefined(newVal) && !_.isNull(newVal))) {
          $timeout(function() {
            backslider = element.backslider(defaultOptions);
          }, 0);
        }
      });
    }
  };
}])

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
      $compile(element)(scope);
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

      scope.$watch('source', function(newVal) {
        if (isInitialized) {
          carousel.jcarousel('reload');
        } else if (!_.isEmpty(newVal)) {
          $timeout(function() {
            carousel.jcarousel({});
          }, 0);
          isInitialized = true;
        }
      });
    },

    controller: ['$scope', '$attrs', function($scope, $attrs) {

      if ($attrs.thCarousel) {
        $scope.$parent[$attrs.thCarousel] = this
      }

      this.next = function() {
        carousel.jcarousel('scroll', '+=1');
      };

      this.prev = function() {
        carousel.jcarousel('scroll', '-=1');
      };
    }]
  };
}])

.directive('thFileInput', ['$parse', function($parse) {
  // Runs during compile
  return {
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    link: function(scope, element, attrs) {
      element.bind('change', function() {
        $parse(attrs.thFileInput)
          .assign(scope, element[0].files);
        scope.$apply();
      });
    }
  };
}])

.directive('thTransformImage', ['$window', function($window) {
  // Runs during compile
  return {
    scope: {
      image: '=thImage'
    },
    restrict: 'E',
    template: [
      '<div class="tfm">',
      '<div class="tfm-area"></div>',
      '<div class="tfm-inner">',
      '<div class="tfm-container">',
      '<div class="tfm-mask">',
      '<img ng-src="{{ image.file}}" class="tfm-image">',
      '</div>',
      '<img ng-src="{{ image.file}}" class="tfm-image tfm-image-overlay">',
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
        }),
        getPosition = function(evt) {
          var posX = 0, posY = 0;

          if (evt.originalEvent.targetTouches) {
            posX = evt.originalEvent.targetTouches[0].pageX;
            posY = evt.originalEvent.targetTouches[0].pageY;
          } else if (evt.pageX || evt.pageY) {
            posX = evt.pageX;
            posY = evt.pageY;
          } else if (evt.clientX || evt.clientY) {
            posX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }

          return {
            x: posX,
            y: posY
          };
        },
        clamp = function(value, min, max) {
          return Math.min(Math.max(value, min), max);
        };

      var transform = {
        init: function() {
          console.log('transform initialized');
          this.cache();
          this.bind();
          return this;
        },
        reload: function() {
          console.log('reload...');
          var self = this;
          self.unbind();
          self.centerImage();
        },
        // cache the elements to work
        cache: function() {
          console.log('cache...');
          var self = this;
          self.dragArea = element.find('.tfm-area');
          self.dragImage = element.find('.tfm-image');
          self.dragMask = element.find('.tfm-mask');

          self.centerImage();
          // vectors
          self.initVectors();

          console.log(self.vector);

        },
        centerImage: function() {
          var self = this;

          self.dragImage.one('load', function() {
            console.log('image load & center');
            // scale and center images

          }).each(function() {
            if (this.complete) {
              $(this).load();
            }
          });
        },
        initVectors: function() {
          var self = this;
          self.vector = {
            init: {
              x: 0,
              y: 0
            },
            current: {
              x: 0,
              y: 0
            },
            imgInit: {
              x: 0,
              y: 0
            },
            imgDest: {
              x: 0,
              y: 0
            }
          };
        },
        bind: function() {
          var self = this;
          console.log('adding listeners... :)');
        },
        unbind: function() {
          console.log('removing listeners... x(');
        },
        onStartHandler: function(evt) {

        },
        rect: function(el) {
          return el[0].getBoundingClientRect();
        }
      };

      var range = {
        init: function(){
          console.log('range initialized..');
          this.cache();
          this.bind();
          return this;
        },
        reload: function(){
          console.log('reload');
          var self = this;
          self.unbind();
        },
        cache: function(){
          console.log('range cache...');
        },
        bind: function(){
          console.log('range binding..');
        },
        unbind: function(){
          console.log('range unbinding..');
        },
      };


      // listen if a new image has been uploaded
      scope.$watch('image', function(newVal) {
        if (isInitialized) {
          transform.reload();
        } else if (!_.isUndefined(newVal) && !_.isEmpty(newVal)) {
          console.log(newVal);
          transform.init();
          isInitialized = true;
        }
      });


    }
  };
}]);
