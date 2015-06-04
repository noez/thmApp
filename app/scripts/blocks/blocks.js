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
        size : '@tqSize'
      },
      template: [
            '<div class="tq-card">',
              '<a class="tq-card__panel" ui-sref="wizard.order">',
                '<div class="tq-card__body">',
                  '<img ng-src="{{ type.bimage }}" height="{{ size }}" />',
                  '<h2 class="tq-card__name"> {{ type.name }}</h2>',
                '</div>',
              '</a>',
            '</div>'
          ].join('')
    };
  }]);
