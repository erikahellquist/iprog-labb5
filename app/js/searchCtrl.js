// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

  //  Dinner.DishSearch.get({title_kw:'chicken'}) 

  $scope.search = function(query) {
   $scope.status = "Searching...";
   Dinner.DishSearch.get({title_kw:query},function(data){
     $scope.dishes=data.Results;
     console.log("result: ", data);
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }

  $scope.setSelectedDish = function(dish) {
    //console.log("di:", dish);
    if (dish != undefined) {
      var newdish = Dinner.Dish.get({id:dish.RecipeID});
      Dinner.setSelectedDish(newdish);
    }
    else {
      Dinner.setSelectedDish(dish)
    }
    
    //console.log(Dinner.getSelectedDish());
  }



});