// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  //var APIKEY = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu"
  //var APIKEY = "XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN"
  //var APIKEY = "r02x0R09O76JMCMc4nuM0PJXawUHpBUL"
  //var APIKEY = "H9n1zb6es492fj87OxDtZM9s5sb29rW3"
  //var APIKEY = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6"
  var APIKEY = "8vtk7KykflO5IzB96kb0mpot0sU40096"
  //var APIKEY = "3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4"

   //$cookieStore.put('guests',variable);
    //$cookieStore.get('myFavorite');
  
  var numberOfGuests = $cookieStore.get('guests');
  if (numberOfGuests == undefined) {
    numberOfGuests = 1;
  }
  var selectedDish = undefined;

  var menu = []

  var cookieList = $cookieStore.get('menu');
  

  var pendingPrice = 0;

  var searchText = undefined;
  var searchType = undefined;


  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:APIKEY});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:APIKEY}); 


  this.cookieToMenu = function(list) {

    if (list != undefined) {
      for (i = 0; i < list.length; i++) {
        dishGet = $resource('http://api.bigoven.com/recipe/:id',{api_key:APIKEY});
        dishGet.get({id:list[i]}, function(data){
          menu.push(data);
        }, function(data){
          console.log("error")
        });
      }
    }
    console.log("menyn ser ut: ", menu);
  }
  this.cookieToMenu(cookieList);


  this.fromMenuToCookie = function() {
    idList = []
    for (j = 0; j < menu.length; j++) {
      idList.push(menu[j].RecipeID);
    }
    console.log("fromMenuToId idList", idList)
    $cookieStore.put('menu', idList);
  }

  this.setSearchText = function(text) {
    searchText = text;
  }

  this.getSearchText = function() {
    return searchText;
  }

  this.setSearchType = function(type) {

    if (type == "starter") {
      type = "Starter"
    }
    else if (type == "mainDish") {
      type = "Main Dish"
    }
    else if (type == "dessert") {
      type = "Dessert"
    }

    searchType = type;
  }

  this.getSearchType = function() {
    return searchType;
  }

  this.setNumberOfGuests = function(num) {
    if (num >= 0) {
      numberOfGuests = num;
      $cookieStore.put('guests', numberOfGuests);
    }
  }


  this.getNumberOfGuests = function() {
    return numberOfGuests;
  }
  
  this.getSelectedDish = function() {
    return selectedDish;
  }

  this.setSelectedDish = function(object) {
    selectedDish = object;
  }

  this.selectedDishInMenu = function() {

    if (selectedDish == undefined) {
      return false;
    }

    for (d in menu) {
      if (menu[d].RecipeID == selectedDish.RecipeID) {
        return true;
      } 
    }
    return false;
  }

  this.idInMenu = function(object) {
    for (no in menu) {
      if (menu[no].RecipeID == object.RecipeID) {
        return true;
      } 
    }
    return false;
  }

  this.getPendingPrice = function() {
    if (this.selectedDishInMenu() == true) {
      return 0;
    }
    return this.getDishGuestPrice(selectedDish);
  }

  //Returns all the dishes on the menu.
  /*this.getFullMenu = function() {

    var fromCookie = $cookieStore.get('menu');
    console.log("fromCookie", fromCookie);
    var fullMenu = [];

    for (key in fromCookie) {
      console.log("på plats: ", key ," i: ", fromCookie[key]);
      //var object = this.Dish.get({id:fromCookie[key]});
      console.log("object: ", object);
      fullMenu.push(object);
    }
    console.log("full menu", fullMenu);

    menu = fullMenu;

    return menu;
  }*/

  this.getFullMenu = function() {
    return menu;
  }


  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var price = 0;
    for (i in menu) {
      price = price + this.getDishGuestPrice(menu[i]);
    }
    if (this.selectedDishInMenu() == false && selectedDish != undefined) {
      price += this.getDishGuestPrice(selectedDish);
    }
    
    return Math.round(price);
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getConfirmedMenuPrice = function() {
    var price = 0;
    for (i in menu) {
      price = price + this.getDishGuestPrice(menu[i]);
    }
    return Math.round(price);
  }

  
  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(object) {
    
    if (this.idInMenu(object) == false) {
      menu.push(object);
      //this.fromMenuToId();
      this.fromMenuToCookie();
    }
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(object) {
    for (index in menu) {
      if (object.RecipeID == menu[index].RecipeID) {
        menu.splice(index, 1);
       // this.fromMenuToId();
       this.fromMenuToCookie();
      }
    }
  }


  //function that returns a price of specific dish with ID
  this.getDishPrice = function (object) {
    var price = 0;
    //  console.log("o: ", object)
      //console.log("o.Ingr: ", object.Ingredients);

      for (key in object.Ingredients) {
        price += object.Ingredients[key].MetricQuantity
      }
    //console.log("price: ", price);
      return price;
  }


  this.getDishGuestPrice = function (object) {
    if (object != undefined) {
      var price = this.getDishPrice(object);
      price = price * numberOfGuests;
      //console.log("guestdishprice: ", price);
      return Math.round(price);
    }
    return 0;
  }




  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});