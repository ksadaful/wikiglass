// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;


function AttemptLogOut()
{
    if (window.XMLHttpRequest) {
         http = new XMLHttpRequest();
    } else {
         http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.open("GET","php/userLogout.php",false);
    http.send();
    var response = JSON.parse(http.responseText);
    console.log(response);
    if(response.status == 404)
    {
        alert("Log out Failed! Reason:" + response.message);
        return false;
    }
    else if (response.status == 200)
    {
        username = "";
        fullname = "";
        return true;
    }

}