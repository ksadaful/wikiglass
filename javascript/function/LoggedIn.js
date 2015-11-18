// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;


function LoggedIn()
{
    if (window.XMLHttpRequest) {
         http = new XMLHttpRequest();
    } else {
         http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.open("GET","php/checkLoginStatus.php",false);
    http.send();
    var response = JSON.parse(http.responseText);
    console.log(response);
    if(response.status==404)
    {
        return false;
    }
    else if (response.status== 200)
    {
        username =  response.username;
        fullname = response.fullname;
        console.log(username);
        console.log(fullname);
    }
    return true;
}