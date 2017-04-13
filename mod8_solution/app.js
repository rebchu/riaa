(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('listItems', ListItemsDirective);

function ListItemsDirective() {
  var ddo = {
    templateUrl: 'listItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'controller',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.foundItems = [];

  menu.NarrowItDown = function(){
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    
    promise.then(function (response) {
      
      if( menu.searchTerm == "" )
        menu.foundItems = [];
      else
        menu.foundItems = response;
      console.log(menu.foundItems);

    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  
  };

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

  menu.emptyList = function(){
    return MenuSearchService.emptyList();
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.foundItems = [];
  service.searchTerm = "";
  service.isClicked = false;

  service.getMatchedMenuItems = function (searchTerm) {
    service.searchTerm = searchTerm;
    service.isClicked = true;
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      service.foundItems = [];
      var menuItemArray = result.data.menu_items;

      for (var i=0; i < menuItemArray.length; i++){
        if (menuItemArray[i].description.includes(searchTerm.toLowerCase())){
          service.foundItems.push(menuItemArray[i]);
        }
      }
      // return processed items
      return service.foundItems;

    });

    return response;
  }

  service.emptyList = function(){
    if(service.isClicked) {
      //console.log(menu.searchTerm)
      //console.log(menu.foundItems.length)
      if (service.searchTerm == "" || service.foundItems.length == 0){
        return true;
      }
      
      return false;
    } 

    return false;
  }

  service.removeItem = function (itemIndex) {
    service.foundItems.splice(itemIndex, 1);
  };
}

})();
