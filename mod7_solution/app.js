(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var buy = this;
		
	ShoppingListCheckOffService.addBuyItem("Cookie", 10);
	ShoppingListCheckOffService.addBuyItem("Milk", 50);
	ShoppingListCheckOffService.addBuyItem("Happiness", 0);


	buy.empty = ShoppingListCheckOffService.checkBuyEmpty();

	buy.toBuyList = ShoppingListCheckOffService.getBuyItems();

	buy.moveBoughtItem = function (itemIndex) {
	  	ShoppingListCheckOffService.moveItem(itemIndex);
	};
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  	var bought = this;
  	bought.empty = ShoppingListCheckOffService.checkBoughtEmpty();
  	
  	bought.boughtList = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of items in buyList or boughtList
  var toBuyList = [];
  var boughtList = [];

  service.moveItem = function (itemIdex) {
  	toBuyList.splice(itemIdex, 1);
 	// push to boughtList;
  };

  service.addBuyItem = function (itemName, quantity) {
    var toBuyItem = {
      name: itemName,
      quantity: quantity
    };
    toBuyList.push(toBuyItem);
  };
  
  service.addBoughtItem = function (itemName, quantity) {
    var boughtItem = {
      name: itemName,
      quantity: quantity
    };
    boughtList.push(boughtItem);
  };


  // return items in the ToBuyList or BoughtList
  service.getBuyItems = function(){
  	return toBuyList;
  };
  service.getBoughtItems = function () {
    return boughtList;
  };

  // If list empty, show message
  service.checkBuyEmpty = function(){
  	return toBuyList.length == 0;
  };
  service.checkBoughtEmpty = function(){
  	return boughtList.length == 0;
  };

}




})();
