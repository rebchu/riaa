(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpInfoServices', 'MenuService'];

function SignUpController(SignUpInfoServices, MenuService) {
  var ctrl = this;
  ctrl.verified = false;
  var submit = false;

  ctrl.submit =  function (){
  	submit = true;
  	SignUpInfoServices.addUser(ctrl.firstname, ctrl.lastname, 
  		ctrl.email, ctrl.phone, ctrl.menuItem);
  }

  ctrl.verifyInfo = function (){
  	var favMenuItem = MenuService.getMenuItemsFromShortName(ctrl.menuNum)
  		.then(function(result){
  			ctrl.verified = true;
        ctrl.menuItem = result.data;
  		})
  		.catch(function(error){
  			ctrl.verified = false;
  		});
  }

  ctrl.favMenuItemCheck = function(){
  	return ctrl.verified&&submit;
  }

}

})();