(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  	$scope.inputDishes = "";
	$scope.message = "";
	$scope.styleColor = "black";

  $scope.displayMessage = function () {
  	var arrayOfDishEntries = $scope.inputDishes.split(",").filter(function(eachDishes) {return /\S/.test(eachDishes); });
    if (arrayOfDishEntries.length <= 3 && arrayOfDishEntries != 0){
    	$scope.message = "Enjoy!";
    	$scope.styleColor = "green";
	}else if (arrayOfDishEntries.length > 3){
		$scope.message = "Too much!";
		$scope.styleColor = "green";
	}else{
		$scope.message = "Please enter data first";
		$scope.styleColor = "red";
	}
  };
}

})();
