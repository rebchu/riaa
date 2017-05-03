(function () {
"use strict";

angular.module('public')
.service('SignUpInfoServices', SignUpInfoServices);

function SignUpInfoServices() {
  var service = this;
  var info = {};

  service.addUser = function (firstname, lastname, email, phone, menuItem) {
    info.firstname = firstname; 
    info.lastname = lastname; 
    info.email = email; 
    info.phone = phone;
    info.menuItem = menuItem; 
  };

  service.getUser = function () {
    return info;
  };


}

})();