// Sidebar controller that we use to display the menu in the sidebar
dinnerPlannerApp.controller('SidebarCtrl', function ($scope,Dinner) {

	$scope.menu = Dinner.getFullDinner();



});