app.controller("Landing", function($scope, $rootScope, $routeParams, $http) {
    window.scope = $scope;
    $scope.eventCategories = [""];
    var oArgs = {
            app_key:   "QfMJMhDnc8BXXWC6",
            id:        "20218701",
            page_size: 25 ,
            q:         $scope.query,
        };

    $scope.redirect = function(query) {
        console.log(query);
        EVDB.API.call("/events/search", oArgs, function(response) {
            console.log(query, response);
        });
    };


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