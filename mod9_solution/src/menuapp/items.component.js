(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
