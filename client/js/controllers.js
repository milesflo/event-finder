app.controller("Landing", function($scope, $rootScope, $routeParams, $http) {
	window.scope = $scope;
	$scope.eventCategories = [""];
	var map;
	$scope.initMap = function () {
  			map = new google.maps.Map(document.getElementById('map'), {
  				center: {lat: -34.397, lng: 150.644},
   				zoom: 8
   			});
   	}
	$scope.initMap();
});

