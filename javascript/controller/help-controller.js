// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;

mainApp.controller('HelpCtrl', ['$scope','$routeParams','$http' , '$window', function($scope, $routeParams,$http , $window) {
    if(LoggedIn())
    {
        SetNavBar();
    }
    else
    {
        window.location.href = "#/login"
    }
}]);
