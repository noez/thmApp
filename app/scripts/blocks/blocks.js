'use strict';
/**
* app.blocks Module
*
* Description
*/
angular.module('app.blocks', [])

  .directive('thTequilaCard', [function(){
    // Runs during compile
    return {
      restrict: 'A',
      scope : {
        type : '=tqType',
        size : '@tqSize',
        selected : '&tqSelected'
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
      link : function (scope, element, attrs) {
        scope.onSelectType = function(type) {
          scope.selected(type);
        };
      }
    };
  }])

 .directive('thWizardStep', ['$compile', function($compile){
    // Runs during compile
    return {
      restrict:'E',
      scope : {
        ref : '@stepRef',
        valid: '=stepValid',
        step : '=step'
      },
      template : [
        '<a class="step">',
          '<span class="step__dot">{{ step.id }}</span>',
          '<span class="step__label">{{ step.label }}</span>',
        '</a>'
      ].join(''),
      transclude : true,
      replace : true,
      link : function (scope, element, attrs) {
        //listening changes
        scope.$watch('valid', function(bool){
          if(bool) {
            element.attr('ui-sref', scope.ref);
            element.attr('ui-sref-active', 'active');
          }else {
            element.removeAttr('ui-sref');
            element.removeAttr('href');
          }
          $compile(element)(scope);
        });
      }
    };

  }]);

