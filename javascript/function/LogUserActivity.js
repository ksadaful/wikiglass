// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;


function LogUserActivity(class_id, group_num, student_name)
{
     var url = "php/logUserActivity.php";

     if(timeline_view) {
        chart_type = 'timeline';
     }
     else
     {
        chart_type = 'statistics';
     }

     if(username== "" ) { return ; }
     var params = "username="+username;
     if(class_id != "") { params = params + "&class=" + class_id ; }
     if(group_num != "") { params = params + "&group=" + group_num ; }
     if(student_name != "") { params = params + "&student=" + student_name ; }
     if(chart_type != "") { params = params + "&chart_type=" + chart_type ; }

     console.log("Logger: "+params);

     if (window.XMLHttpRequest) {
         http = new XMLHttpRequest();
     } else {
         http = new ActiveXObject("Microsoft.XMLHTTP");
     }
     http.open("POST", url, true);
     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

     http.onreadystatechange = function()
     {
         if (http.readyState == 4 && http.status == 200) {
                console.log("User activity logged successfully")
         }
         else
         {
               console.log(http.responseText);
         }

     }
     http.send(params);
}