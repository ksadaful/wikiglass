// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;


function SetNavBar()
{
    document.getElementById("welcome-msg").innerHTML = 'Welcome '+ fullname +'!';
    document.getElementById("logout").innerHTML = '<a href="#/logout"><span class="text-danger">Logout </span></a>';
//    document.getElementById("logs").innerHTML = '<a href="#/logs"><span class="text-danger"> User Logs </span></a>';
}