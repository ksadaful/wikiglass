mainApp.controller('EditProfileCtrl', ['$scope','$routeParams','$http' , '$window', function($scope, $routeParams,$http , $window) {

    var OldPassowrd = "";
    if(!LoggedIn())
    {
        window.location.href = "#/login";
        CleanNavBar();
    }
    else
    {
        SetNavBar();
        $http.get('php/getUserDetails.php?username='+ username ).
            success(function(data, status, headers, config) {

                if(data == "")
                {
                    alert('Sorry an error has occurred!');
                    window.location.href = "#/dashboard";

                }
                document.getElementById("inputUsername").value =    data.username ;
                document.getElementById("inputFirstname").value =   data.fullname;
                document.getElementById("inputEmail").value =       data.email ;
                OldPassowrd = data.password;
                console.log(OldPassowrd);
                document.getElementById("inputUsername").readOnly = true;


            }).
            error(function(data, status, headers, config) {
                alert("Error: Could not retrieve data from server!");
            });

        function submitUpdateDetails()
        {
            console.log("Update Button clicked");
            var params = "";
            var username =  document.getElementById("inputUsername").value;
            var fullname = document.getElementById("inputFirstname").value;
            var email =     document.getElementById("inputEmail").value;
            var inputOldPassword =     document.getElementById("inputOldPassword").value;
            var inputPassword =     document.getElementById("inputPassword").value;
            var verifyPassword =    document.getElementById("verifyPassword").value;

            if(inputOldPassword != "")
            {
                if(inputPassword != verifyPassword )
                {
                    document.getElementById("error_msg").innerHTML = "The new passwords don't match! Please re-input.";
                    document.getElementById("inputPassword").value = "";
                    document.getElementById("verifyPassword").value = "";
                    return;
                }

                if(inputOldPassword != OldPassowrd )
                {
                    document.getElementById("error_msg").innerHTML = "The old password is incorrect!";
                    document.getElementById("inputOldPassword").value = "";
                    return;
                }

                if(inputPassword == OldPassowrd )
                {
                    document.getElementById("error_msg").innerHTML = "The old and new password are the same!";
                    document.getElementById("inputPassword").value = "";
                    document.getElementById("verifyPassword").value = "";
                    document.getElementById("inputOldPassword").value = "";
                    return;
                }

                if(inputPassword.length < 8 )
                {
                    document.getElementById("error_msg").innerHTML = "New Password has to be at least 8 Characters long!";
                    return;
                }


                params = "username=" + username + "&fullname=" + fullname  + "&email=" + email+ "&password=" + inputPassword ;
            }
            else
            {
                params = "username=" + username + "&fullname=" + fullname  + "&email=" + email+ "&password=" + OldPassowrd ;
            }

            console.log(  params  );

            if (window.XMLHttpRequest) {
                http = new XMLHttpRequest();
            } else {
                http = new ActiveXObject("Microsoft.XMLHTTP");
            }
            http.open("POST", "php/updateUserDetails.php", true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            http.onreadystatechange = function()
            {
                if (http.readyState == 4 && http.status == 200) {
                    console.log(http.responseText);
                    var response = JSON.parse(http.responseText);
                    document.getElementById("inputPassword").value = "";
                    document.getElementById("verifyPassword").value = "";
                    document.getElementById("inputOldPassword").value = "";
                    document.getElementById("error_msg").innerHTML =  response.message ;

                }
            }
            http.send(params);
        }

        $scope.submitUpdateDetails = submitUpdateDetails;
    }

    $window.scrollTo(0,0);
}]);


// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;
