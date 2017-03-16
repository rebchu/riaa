(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('calculatePrice', CalculatePriceFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var buy = this;
		
	ShoppingListCheckOffService.addBuyItem("Cookies", 10, 5);
	ShoppingListCheckOffService.addBuyItem("Gallons of Milk", 50, 5);
	ShoppingListCheckOffService.addBuyItem("Happiness", 0, 0);
	ShoppingListCheckOffService.addBuyItem("4.0 GPA", 2, 1000000);
	ShoppingListCheckOffService.addBuyItem("Hitchcock's Love", 1, 0);

	buy.toBuyList = ShoppingListCheckOffService.getBuyItems();

	buy.moveBoughtItem = function (itemIndex) {
	  	ShoppingListCheckOffService.moveItem(itemIndex);
	};

	buy.empty = function(){
		return buy.toBuyList.length == 0;
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'calculatePriceFilter'];
function AlreadyBoughtController(ShoppingListCheckOffService, calculatePriceFilter) {
  	var bought = this;  	
  	bought.boughtList = ShoppingListCheckOffService.getBoughtItems()
  	bought.empty = ShoppingListCheckOffService.checkBoughtEmpty();

  	bought.empty = function(){
		return bought.boughtList.length == 0;
	}

	bought.totalPrice = function(quantity, price){
		return calculatePriceFilter(quantity, price);
	}
}

function CalculatePriceFilter(){
	return function(quantity, price){
		return "$$$"+quantity*price;
	}
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of items in buyList or boughtList
  var toBuyList = [];
  var boughtList = [];

  service.moveItem = function (itemIndex) {
  	boughtList.push(toBuyList[itemIndex]);
  	toBuyList.splice(itemIndex, 1);
  };

  service.addBuyItem = function (itemName, quantity, price) {
    var toBuyItem = {
      name: itemName,
      quantity: quantity,
      pricePerItem: price
    };
    toBuyList.push(toBuyItem);
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
