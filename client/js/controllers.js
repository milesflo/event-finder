app.controller("Landing", function($scope, $rootScope, $routeParams) {
	window.scope = $scope;
	$scope.eventCategories = [""];

	$http.get("<insert API url here>").then(function(response) {
		$scope.events = response.data;

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
})

