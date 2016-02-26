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

    // function random(arr) {
    //     return Math.floor(Math.random() * arr.length)
    // }

    $scope.musicArr = [{ title: 'Tricycle Music Festival in San Francisco',
    start_time: '2017-01-01T16:00:00-0800',
    end_time: '2017-01-01T18:00:00-0800',
    img: '/client/images/EpicEventsLogo2.png',
    description: 'Grammy winners rally for early literacy during the Library’s sixth annual free Tricycle Music Fest. Alison Faith Levy gets the party started early in San Mateo County with the Foster City Library–the roaring outdoor show in the Leo J. Ryan amphitheater on Saturday Sept. 13 will include acrobats and caricature portraits. Lucky Diaz and the Family Jam Band, known as “the faces of kindie music” by T...\r\n\r\nMore info: http://evrd.us/tq8i9\r\n\r\nFind tickets: http://evrd.us/Q1lnB' },
  { title: 'Mision San Francisco De la Espada/ St. Francis Cabrini Festival Music Ministry 2nd annual Valentine Dance',
    start_time: '2016-02-13T20:00:00-0600',
    end_time: '2016-02-14T01:00:00-0600',
    description: 'Music By: Hunter Chavez Y Los Cazadorez  & DJ \nAddress: 10507 S. Presa \nPrice: $10.00 per person \nTicket Information Contact: Darlene Longoria 210-237-5845 or  Blue Wing Ballroom (210) 380-1717\n(Sorry No Alcholic Botlles due to Hall Donation & no children under 15)',
    img: 'https://scontent.xx.fbcdn.net/hphotos-xlf1/t31.0-8/s720x720/12363039_1034779423211409_8051659216952475853_o.jpg' },
  { title: 'Hot Air Music Festival 2016',
    start_time: '2016-03-06T10:30:00-0800',
    end_time: '2016-03-06T21:30:00-0800',
    description: 'Hot Air\'s 6th Annual Music Festival\nSunday, March 6\n10:30am-9:30\n\nYou may notice that some halls will overlap performances.  Please feel free to drop in and out of any halls at any time. Admission is free.\n\nSession 1: Recital Hall, 10:30-1:00\nSession 2: Osher Salon, 1:00-4:30\nSession 3: Recital Hall, 3:00-6:00\nSpecial Event: Osher Salon, 5:00-6:30\nSession 4: Concert Hall, 7:00-9:30\n\nNew Music, New Heights',
    img: 'https://scontent.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/s720x720/12745843_1246627058687644_8553383530359204928_n.jpg?oh=c581f850354256ae7042573e67bd0a75&oe=576AB45C' }]

    // function picker(data) {
    //     for (var i = 0; i < 4; i++) {
    //         $scope.music.push(data[random(data)]);
    //     }
    // }
})


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