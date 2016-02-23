var app = angular.module("eventTracker", ["ngRoute", "ngAnimate", "ngResource"]);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
	
	$routeProvider
	.when('/', {
		templateUrl: "/client/views/templates/landing.html",
		controller: "Landing",
	})
	.when('/api', {
		templateUrl: "client/views/templates/apiReq.html",
		controller: 'ApiCtrl'
	})
	.when('/event', {
		templateUrl: "partials/event.html",
		controller: "Landing"
	})
	.when('/login',{
	    templateUrl: "/client/templates/login.html",
	    controller: "LoginController",
  	})
  	.when('/signup',{
	    templateUrl: "/client/templates/signup.html",
	    controller: "SignupController",
  	})
  	.otherwise({
		redirectTo: "/"
	});

	$locationProvider.html5Mode(true);
	// Registed the interceptor for our application
  	$httpProvider.interceptors.push("AuthInterceptor");
});

app.service("AuthInterceptor", function($window,$location,$q){
  return {
    request: function(config){
      var token = localStorage.getItem('jwt');
      
      // If the JWT exists in local storage, add an authorization header
      if(token) config.headers.Authorization = 'Bearer ' + token;

      return config;
    }
  };
});


