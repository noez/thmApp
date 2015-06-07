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
  var puto = null;

  return {
    restrict: 'E',
    scope: {
      source: '=thSource'
    },
    transclude: true,
    template: [
      '<div class="jcarousel">',
      '<ul>',
      '<li ng-repeat="item in source" class="tq-carousel-item" ng-click="clickTemplate(item);">',
      '<img ng-src="{{ item.timage }}"/>',
      '</li>',
      '</ul>',
      '</div>',
      '<div class="jcarousel-controls">',
      '<button ng-click="carouselPrev()">Prev</button>',
      '<button ng-click="carouselNext()">Next</button>',
      '</div>'
    ].join(''),

    link: function(scope, element) {
      var isInitialized = false,
        carousel = element.children('.jcarousel');

      scope.clickTemplate = function (item) {
        console.log(item);
      };

      puto = {
        click : scope.clickTemplate
      };

      scope.$watch('source', function(newVal) {
        if (isInitialized) {
          carousel.jcarousel('reload');
        }
        if (!_.isEmpty(newVal)) {
          $timeout(function() {
            carousel.jcarousel({});
          }, 0);
          isInitialized = true;
        }
      });

      scope.carouselPrev = function() {
        carousel.jcarousel('scroll', '-=1');
      };

      scope.carouselNext = function() {
        carousel.jcarousel('scroll', '+=1');
      };
    },
    controller : ['$scope', '$attrs',  function ($scope, $attrs) {
      /*if ($attrs.thInstance) {
        $scope.$parent[$attrs.thInstance] = this;
      }*/
      console.log(puto);
    }]
  };
}]);
