app.controller("Landing", function($scope, $rootScope, $routeParams, $http) {
    window.scope = $scope;
    $scope.eventCategories = [""];
    $scope.loading = false;
    $scope.queueSearch = function(query) {
        console.log(query);
        // add a spinner gif to the page
    	$http.get("/apiGet?q="+query);
        $scope.loading = true;

        // use setTimeout to make another request after .5 seconds
        setTimeout( function() {
            $http.get("/searchResults?q="+query).then(function(results) {
/* THIS IS THE RESULT OF THE DATABASE CALL. IT DOES NOT FILTER DUPLICATE SEARCHES/RESULTS*/
                $scope.results=results;
            });
            $scope.loading = false;
        },2000);
    };

    // $http.get("/api/eventBrite").success(function (data) {
    //     data = data.myData;
    // });



    // $scope.initMap = function () {
    //         map = new google.maps.Map(document.getElementById('map'), {
    //             center: {lat: -34.397, lng: 150.644},
    //             zoom: 8
    //         });
    // }

    // $scope.initMap();
});


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

app.controller('ApiCtrl', function($scope, $http, $timeout){

});