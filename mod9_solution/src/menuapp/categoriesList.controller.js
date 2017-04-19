(function () {
'use strict';

angular.module('data')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['MenuDataService', 'categories'];
function CategoriesListController(MenuDataService, categories) {
  var categoriesList = this;
  categoriesList.categories = categories.data;
}

})();
