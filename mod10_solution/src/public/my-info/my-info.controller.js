(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService','SignUpInfoServices','ApiPath'];

function MyInfoController(MenuService, SignUpInfoServices, ApiPath) {
  var ctrl = this;
  ctrl.user = SignUpInfoServices.getUser();
  ctrl.favDishImg = '';

  ctrl.isRegistered = function (){
  	if (Object.keys(ctrl.user).length > 0){
  			ctrl.favDishImg = ApiPath + '/images/' + ctrl.user.menuItem.short_name + '.jpg';
        return true;
  	}else {
  			return false;
    }
  }

}

})();