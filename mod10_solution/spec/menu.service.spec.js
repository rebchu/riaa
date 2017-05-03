describe('Returning Menu Item with Short name via MenuService', function () {

  var favMenuItems;
  var $httpBackend;
  var ApiPath;
  var short_name = "L1";

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      menuservice = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return menu items', function() {
    console.log('/menu_items/'+ short_name +'.json');
    $httpBackend.whenGET('https://calm-everglades-77931.herokuapp.com/menu_items/'+ short_name +'.json').respond(['Lunch', 'Dessert']);
    
    menuservice.getMenuItemsFromShortName(short_name).then(function(response) {
      console.log(response.data);
      expect(response.data).toEqual(['Lunch', 'Dessert']);
    });
    $httpBackend.flush();
  });

});
