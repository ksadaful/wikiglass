function validateLogin(id)
{

     var username = document.getElementById("inputUsername").value;
     var password = document.getElementById("inputPassword").value;

     var url = "php/validateLogin.php";
     var params = "username="+username+"&password=" + password;

     if (window.XMLHttpRequest) {
         http = new XMLHttpRequest();
     } else {
         http = new ActiveXObject("Microsoft.XMLHTTP");
     }
     http.open("POST", url, true);
     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

     http.onreadystatechange = function()
     {
     	if(http.readyState == 4 && http.status == 200)
     	{
            var response = JSON.parse(http.responseText);

            console.log(response);
            if(response.status==200)
            {
                window.location.href = "#/dashboard"
            }
            else
            {
                document.getElementById("login-form").reset();
                document.getElementById("inputUsername").style.backgroundColor = 0;
                if (response.status==404)
                {  document.getElementById("login-error").innerHTML = response.message; }
                else
                {  document.getElementById("login-error").innerHTML = "Some unknown error happened"; }
            }
     	}
     }
     http.send(params);
}
