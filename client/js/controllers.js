app.controller("Landing", function($scope, $rootScope, $routeParams, $http) {
	window.scope = $scope;
	$scope.eventCategories = [""];


	console.log("foo");
	$http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDtYI_eraaIZ5feXutGQOPRVNY2_15G5VQ&callback=initMap").then(function(response) {
		console.log("foo");
		$scope.map = response.data;
		$scope.initMap = function () {
  			map = new google.maps.Map(document.getElementById('map'), {
  				center: {lat: -34.397, lng: 150.644},
   				zoom: 8
   			});
   		};
	});
});

app.controller('ApiCtrl', function($scope, $http, $timeout){
  $timeout(function() { FB.api('/search', 'GET', {q: 'fun', type: 'event'}, function(data) { console.log(data)}) }, 2000)
})


app.controller('LoginController', function($scope, $http) {
    $scope.user = {};
    $scope.posts = [];

    $scope.login = function() {
        $http({
            method: "POST",
            url: "/api/login",
            data: $scope.user
        }).then(function(data) {
            // Save the JWT to localStorage so we can use it later
            localStorage.setItem('jwt', data.data.jwt);
        }).catch(function(err){
            console.log(err);
            console.log("BAD THING ^^^");
        });
    }
});

