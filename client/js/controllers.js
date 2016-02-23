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
        EVDB.API.call("/events/search", oArgs, function(response) {
            console.log(query, response);
        })
    }

    $scope.initMap = function () {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 37.7833, lng: -122.4167},
                zoom: 8
            });
    }
    $scope.initMap();
});