var app = angular.module("eventTracker", ["ngRoute", "ngAnimate"]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: "client/partials/landing.html",
		controller: "LandingController"
	});
	// .when('/event', {
	// 	templateUrl: "partials/event.html"
	// 	controller: "Landing"
	// })
	// .otherwise({
	// 	redirectTo: "/"
	// })
});