app.controller("Landing", function($scope, $rootScope, $routeParams, $http) {
    window.scope = $scope;
    $scope.eventCategories = [""];
    var query = $scope.query;

    $scope.redirect = function(query) {
        console.log(query);
        $http.get("http://eventful.com/events?q="+ query, function(response) {
            console.log("It works yay");
        })
    }

    $scope.initMap = function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
    }
    $scope.initMap();
});