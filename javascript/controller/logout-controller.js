// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;



mainApp.controller('LogoutCtrl', ['$scope','$routeParams','$http' , '$window', function($scope, $routeParams,$http , $window) {
    if(LoggedIn())
    {
        if(AttemptLogOut())
        {
            CleanNavBar();
            window.location.href = "#/login"
        }
        else
        {
            window.location.href = "#/dashboard"
        }
    }
    else
    {
        window.location.href = "#/login"
    }
}]);
