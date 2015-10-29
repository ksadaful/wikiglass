// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;


mainApp.controller('DashboardCtrl', ['$scope','$routeParams','$http' , '$window', function($scope, $routeParams,$http , $window) {

    if(!LoggedIn())
    {
        window.location.href = "#/login"
        CleanNavBar();
    }
    else
    {
        SetNavBar();
        $http.get('php/getAllWikiPagesByUsername.php?username='+username).
            success(function(data, status, headers, config) {
              $scope.wikiPages = data;
              listOfClasses = data;
              console.log($scope.wikiPages);
            }).
            error(function(data, status, headers, config) {
              alert("Error: Could not retrieve data from server!");
            });
        $window.scrollTo(0,0);
    }
}]);
