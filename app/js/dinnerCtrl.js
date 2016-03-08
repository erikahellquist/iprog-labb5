// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.menu = function() {
    console.log("calling get full menu in dinnerCtrl!");
  	return Dinner.getFullMenu();
  } 

  $scope.getDishGuestPrice = function(dish) {
  	return Dinner.getDishGuestPrice(dish);
  }

  $scope.pendingPrice = function() {
  	return Dinner.getPendingPrice();
  } 

  $scope.dinnerPrice = function() {
  	return Dinner.getTotalMenuPrice();
  }

  $scope.getConfirmedMenuPrice = function() {
  	return Dinner.getConfirmedMenuPrice();
  }

  $scope.setSelectedDish = function(dish) {
    Dinner.setSelectedDish(dish);
  }
  $scope.getSelectedDish = function() {
    return Dinner.getSelectedDish();
  }

  $scope.isCurrent = function(dish) {
    if (Dinner.getSelectedDish() != undefined && dish != undefined) {
      if (dish.RecipeID == Dinner.getSelectedDish().RecipeID) {
        return true
      }
    }
    return false;
  }

  $scope.isPendingInMenu = function() {

    if (Dinner.selectedDishInMenu() == false) {     // If it's not in the menu
      if (Dinner.getSelectedDish() == undefined) {  // If it is undefined
        //console.log("return none1");
        return "none";

      }
      else {
        //console.log("return false2");                // not in menu but not undefined
        return false;
      }
    }
    else {      // If it is in the menu
      //console.log("return true3");
      return true;
    }
  }




  $scope.removeDish = function(dish) {
   	Dinner.removeDishFromMenu(dish)
   }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});