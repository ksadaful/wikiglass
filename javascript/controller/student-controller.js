// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;



mainApp.controller('GroupStudentCtrl', ['$scope','$routeParams','$http' , '$window', function($scope, $routeParams,$http , $window) {
    if(!LoggedIn())
    {
       window.location.href = "#/login"
       CleanNavBar();
    }
    else
    {
       SetNavBar();

       classID = $routeParams.class_id;
       groupNo = $routeParams.group_no;
       studentName = $routeParams.student_name;
       $scope.className = classID
       $scope.groupNo = groupNo;
       $scope.StudentName = studentName;

       LogUserActivity(classID, groupNo, studentName);

       $http.get('php/getStudentDataByClassAndGroup.php?groupNo='+ classID + 'gp' +  groupNo + '&name='+ studentName ).
           success(function(data, status, headers, config)
           {
               $scope.data = data;

               var RevisionPoints = [];
               var AdditionPoints = [];
               var DeletionPoints = [];

               for (i=0; i<data.Pbworks.length; i++){
                   RevisionPoints.push({y: parseInt(data.Pbworks[i]["revByPage"]), label: data.Pbworks[i]["page"]});
                   AdditionPoints.push({y: parseInt(data.Pbworks[i]["addByPage"]), label: data.Pbworks[i]["page"]});
                   DeletionPoints.push({y: parseInt(data.Pbworks[i]["delByPage"]), label: data.Pbworks[i]["page"]});
               }

               var RevisionCountChart = new CanvasJS.Chart("RevisionCountChart",
               {
                   title:{
                       text: "Revision Counts in Each Page",
                       fontSize: 20
                   },
                   animationEnabled: true,
                   axisX: {
                       lineThickness: 2,
                       labelFontSize: 12,
                       interval: 1,
                       tickLength: 8
                   },
                   axisY2: {
                       lineThickness: 1,
                       interval: 1,
                       gridColor: "rgba(1,77,101,.1)",
                       labelFontSize: 15
                   },
                   animationEnabled: true,
                   theme: "theme2",
                   data: [
                   {
                       type: "bar",
                       axisYType: "secondary",
                       toolTipContent: "<strong>{label}: </strong> {y} revisions",
                       dataPoints:RevisionPoints
                   }]
               });
               RevisionCountChart.render();

               var WordAmendChart = new CanvasJS.Chart("WordAmendChart",
               {
                   title:{
                       text: "Word Amended in Each Page",
                       fontSize: 20
                   },
                   animationEnabled: true,
                   axisX: {
                       lineThickness: 2,
                       labelFontSize: 12,
                       interval: 1,
                       tickLength: 8
                   },
                   axisY2: {
                       lineThickness: 1,
                       gridColor: "rgba(1,77,101,.1)",
                       labelFontSize: 15
                   },
                   legend: {
                       cursor:"pointer",
                       itemclick : function(e) {
                           if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                               e.dataSeries.visible = false;
                           } else {
                               e.dataSeries.visible = true;
                           }
                           WordAmendChart.render();
                       }
                   },
                   toolTip: {
                       shared: true,
                       content: function(e){
                           var str = '';
                           var total = 0 ;
                           var str3;
                           var str2 ;
                           for (var i = 0; i < e.entries.length; i++){
                               var  str1 = "<strong><span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + ":</span></strong> "+  e.entries[i].dataPoint.y + "<br/>" ;
                               total = e.entries[i].dataPoint.y + total;
                               str = str.concat(str1);
                           }
                           str2 = "<span><strong>"+e.entries[0].dataPoint.label + "</strong></span><br/>";
                           str3 = "<span style = 'color:Tomato '><strong>Total Words Amended: </strong></span>" + total + "<br/>";
                           return (str2.concat(str)).concat(str3);
                       }
                   },
                   theme: "theme2",
                   data: [
                   {
                       type: "bar",
                       showInLegend: true,
                       name: "Words Added",
                       axisYType: "secondary",
                       color: "gold",
                    dataPoints:AdditionPoints
                },
                {
                    type: "bar",
                    showInLegend: true,
                    name: "Words Deleted",
                    axisYType: "secondary",
                    color: "silver",
                    dataPoints:DeletionPoints
                }]
               });
               WordAmendChart.render();
           }).
           error(function(data, status, headers, config) {
             alert("Error: Could not retrieve data from server!");
           });
           $window.scrollTo(0,0);
    }
}]);


