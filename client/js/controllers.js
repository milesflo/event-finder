app.controller("Landing", function($scope, $http) {
	$scope = window.scope;
	//$scope.eventCategories = [""];
	
	
	console.log('Hello');
	
// 	$http.get("http://api.eventful.com/js/api").then(function(response) {
// 		eventCategories.results = function(){
// 	        app_key:"QfMJMhDnc8BXXWC6",

//             id: "20218701",

//             page_size: 25 

//   		};
// 		console.log(eventCategories.results);

		function show_alert()

		{

		  var oArgs = {

		            app_key:"QfMJMhDnc8BXXWC6",

		            id: "20218701",

		            page_size: 25 ,

		  };

		  EVDB.API.call("/events/get", oArgs, function(oData) {

		      // Note: this relies on the custom toString() methods below

		    });

		}





		$scope.categories = function() {
		// 	for (var n = 0; n < arr.length; n++) {
		//     	var current = arr[n];
		//     	var index = $scope.eventCategories.indexOf(current);
		//     	if (index === -1) {
		//     		$scope.eventCategories.push(arr[n]);
		//     	}
		//     }
		// };
		// for (var i=0; i < $scope.events.length; i++) {
		// 	categories($scope.categories[i].categories);
		// }
		console.log(categories());
	}
})
// app.controller("Landing", function($scope, $rootScope, $routeParams, $http) {
// 	$scope = window.scope;
// 	$scope.eventCategories = [""];


// 	console.log("foo");
// 	$http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDtYI_eraaIZ5feXutGQOPRVNY2_15G5VQ&callback=initMap").then(function(response) {
// 		console.log("foo");
// 		$scope.map = response.data;
// 		$scope.initMap = function () {
//   			map = new google.maps.Map(document.getElementById('map'), {
//   				center: {lat: -34.397, lng: 150.644},
//    				zoom: 8
//    			});
//    		}
// 	});
// });


