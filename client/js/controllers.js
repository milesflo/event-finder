app.controller("Landing", function($scope, $rootScope, $routeParams, $http) {
	// window.scope = $scope;
	// $scope.eventCategories = [""];

	// $http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDtYI_eraaIZ5feXutGQOPRVNY2_15G5VQ&callback=initMap").then(function(response) {
	// 	console.log("foo");
	// 	$scope.map = response.data;
	// 	$scope.initMap = function () {
 //  			map = new google.maps.Map(document.getElementById('map'), {
 //  				center: {lat: -34.397, lng: 150.644},
 //   				zoom: 8
 //   			});
 //   		}
	// });
});

app.controller('ApiCtrl', function($scope, $http, $timeout){
	$timeout(function() { FB.api('/search', 'GET', {q: 'fun', type: 'event'}, function(data) { console.log(data)}) }, 2000)
})

