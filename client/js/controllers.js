app.controller("Landing", function($scope, $rootScope, $routeParams, $http, $location) {
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
                var res = theGreaterParser(results)
                $scope.results = [res[random(res)], res[random(res)], res[random(res)]]
                // console.log($scope.results);
            });
            $scope.loading = false;
        },2000);
    }

    $scope.getEvent = function(id) {
        $http.get('/event/' + id).then(function(data) {
            $scope.tmp = data;
            $location.path('/event/'+id);
        })
    }

    $http.get('/loadHome').then(function(data) {
        console.log(data);
        $scope.musicArr = picker(data.data[0].data);
        $scope.foodArr = picker(data.data[1].data);
        $scope.sportsArr = picker(data.data[2].data);
    })

    // $http.get("/api/eventBrite").success(function (data) {
    //     data = data.myData;
    // });
})

function picker(arr) {
    var tmp = [];
    for (var i = 0; i < 3; i++) {
        tmp.push(arr[random(arr)]);
    }
    return tmp
}

function random(arr) {
    return Math.floor(Math.random() * arr.length - 1)
}

function theGreaterParser(data) {
        var tmpArr = data.data,
            final = [];
        for (var i = 0; i < tmpArr.length; i++) {
            var tmpObj = {},
                event = tmpArr[i].eventJson;

            if(event.title) {
                tmpObj.title = event.title;
                tmpObj.id = event.id
            }
            if (event.image.large) {
                tmpObj.img = event.image.large.url;
            } else {
                tmpObj.img = '/client/images/Drawing.png';
            }
            if (event.description) {
                tmpObj.description = event.description;
            }
            if (event.start_time) {
                tmpObj.start_time = event.start_time;
            }
            if (event.stop_time) {
                tmpObj.end_time = event.stop_time;
            }
            if (i > 99) {
                return final;
            }
            final.push(tmpObj)
        }
        return final;
    }
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

app.controller("Event", function($scope, $rootScope, $routeParams, $http, $location) {

    var id = $routeParams.id;
    $http.get('/event/'+id).then(function(data) {
        $scope.event=theGreaterParser(data)[0];
    });

})