app.controller("LandingController", function($scope, $http) {
	window.scope = $scope;
	$scope.eventCategories = [""];
	var event1 = $scope.findEvent.replace(' ', '+');
	console.log('Hello');
	$http.get("http://eventful.com/events?q=" + event1).then(function(response) {
		eventCategories.results = response.data.Search;
		$scope.events = response.data;
		console.log(response.data);

		function categories(arr) {
			for (var n = 0; n < arr.length; n++) {
		    	var current = arr[n];
		    	var index = $scope.eventCategories.indexOf(current);
		    	if (index === -1) {
		    		$scope.eventCategories.push(arr[n]);
		    	}
		    }
		};
		for (var i=0; i < $scope.events.length; i++) {
			categories($scope.categories[i].categories);
		}
	})
	console.log(eventCategories.results);
})

