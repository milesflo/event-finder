var app = angular.module("eventTracker", ["ngRoute", "ngAnimate"]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: "/client/views/templates/landing.html",
		controller: "Landing",
	})
	.when('/api', {
		templateUrl: "client/views/templates/apiReq.html",
		controller: 'ApiCtrl'
	})

	//.when('/event', {
	// 	templateUrl: "partials/event.html",
	// 	controller: "Landing"
	// })
	// .otherwise({
	// 	redirectTo: "/"
	// })
})

