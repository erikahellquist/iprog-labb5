// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case


  $scope.dish = Dinner.Dish.get({id:$routeParams.dishId});
  //console.log("dish:", $scope.dish);

  $scope.setSel = function() {
    Dinner.setSelectedDish($scope.dish);
  }


  $scope.ingredientPriceOrAmount = function(ingredient) {
    var price = ingredient.MetricQuantity * Dinner.getNumberOfGuests();

    return Math.round(price);
  } 

  $scope.dishPrice = function(dish) {
    return Dinner.getDishGuestPrice(dish);
  }



  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

   $scope.addDish = function(dish) {
   	Dinner.addDishToMenu(dish);
  }

   

  $scope.setSelectedDish = function(dish) {
    //console.log("di:", dish);
    if (dish != undefined) {
      var newdish = Dinner.Dish.get({id:dish.RecipeID});
      Dinner.setSelectedDish(newdish);
    }
    else {
      Dinner.setSelectedDish(dish);
    }
    
    //console.log(Dinner.getSelectedDish());
  	}
});