// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;


mainApp.controller('ClassGroupCtrl', ['$scope','$routeParams','$http' , '$window', function($scope, $routeParams,$http , $window) {
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
       $scope.className = classID
       $scope.groupNo = groupNo;

       LogUserActivity(classID, groupNo, "");

       console.log(timeline_view);

       var timeline_loaded = false;
       var comparison_loaded = false;

       function ShowComparison()
       {
         console.log("Comparison Button clicked");
         LogUserActivity(classID, groupNo, "");
         $scope.show_comp = true;
         $scope.show_time = false;
         timeline_view = false;
         if(comparison_loaded) return;
         $http.get('php/getGroupDataByClass.php?groupNo='+ $routeParams.class_id + 'gp' +  $routeParams.group_no ).
           success(function(data, status, headers, config)
           {
               var PagePoints = [];
               var RevisionPoints = [];
               var AdditionPoints = [];
               var DeletionPoints = [];

               for (i=0; i < data.Pbworks.length; i++)
               {
                   PagePoints.push({y: parseInt(data.Pbworks[i]["page"]), label: data.Pbworks[i]["name"]});
                   RevisionPoints.push({y: parseInt(data.Pbworks[i]["rev"]), label: data.Pbworks[i]["name"]});
                   AdditionPoints.push({y: parseInt(data.Pbworks[i]["add"]), label: data.Pbworks[i]["name"]});
                   DeletionPoints.push({y: parseInt(data.Pbworks[i]["del"]), label: data.Pbworks[i]["name"]});
               }
               generateGroupChart("PageChart",     "Number of Pages Revised by Each Student",  PagePoints     , 'pages'     , classID, groupNo);
               generateGroupChart("RevisionChart", "Number of Revisions Made by Each Student", RevisionPoints , 'revisions' , classID, groupNo);
               generateGroupChart("AdditionChart", "Number of Words Added by Each Student",    AdditionPoints , 'words'     , classID, groupNo);
               generateGroupChart("DeletionChart", "Number of Words Deleted by Each Students", DeletionPoints , 'words'     , classID, groupNo);
           }).
           error(function(data, status, headers, config) {
             alert("Error: Could not retrieve data from server!");
           });
         comparison_loaded = true;
       }

        function ShowTimeline()
        {

         console.log("Timeline Button clicked");
         LogUserActivity(classID, groupNo, "");
         $scope.show_comp = false;
         $scope.show_time = true;
         timeline_view = true;
         if(timeline_loaded) return;
         $http.get('php/getWeeklyWordAmendmentByGroupIdTimeline.php?group_id='+ $routeParams.class_id + 'gp' +  $routeParams.group_no ).
           success(function(data, status, headers, config)
           {
//                  console.log(data);
//                  console.log("HIGHCHART: " );
//                  console.log(data.data);

              for(i = 0 ; i < data.data.length ; i++)
              {
                   var cumulative_word_count = 0;
                   for(j = 0 ; j < data.data[i].data.length ; j++)
                   {
                      cumulative_word_count = cumulative_word_count + parseInt(data.data[i].data[j].y)
                      data.data[i].data[j].x = Date.parse(data.data[i].data[j].x);
                      data.data[i].data[j].y = cumulative_word_count;

                   }
              }
//                 console.log("MODIFIED DATA: " );
//                  console.log(data.data);
                 $( function () {
                     $('#word-amendment-timeline').highcharts({
                         chart: {
                             type: 'line'
                         },
                         title: {
                             text: 'Word Amendment Count Timeline'
                         },
                         xAxis: {
                             type: 'datetime',
                             dateTimeLabelFormats: { // don't display the dummy year
                                 month: '%e. %b',
                                 year: '%b'
                             },
                             title: {
                                 text: 'Date'
                             }
                         },
                         yAxis: {
                             title: {
                                 text: 'Word Amendment Count'
                             },
                             min: 0
                         },
                         tooltip: {
                             headerFormat: '<b>{series.name}</b><br>',
                             pointFormat: '{point.x:%e. %b}: {point.y} Word Amendment counts'
                         },

                         plotOptions: {
                             line: {
                                 marker: {
                                     enabled: true
                                 }
                             },

                             series:
                             {
                                 cursor: 'pointer',
                                 point: {
                                     events: {
                                         click: function (event)
                                         {
                                             window.location.href = this.url;
                                         }
                                     }
                                 },
                                 marker: {
                                     lineWidth: 1
                                 }
                             }
                         },

                         series: data.data
                     })
                 });

           }).
           error(function(data, status, headers, config) {
             alert("Error: Could not retrieve data from server!");
           });
         timeline_loaded = true;
        };

        $scope.showComparison = ShowComparison;
        $scope.showTimeline = ShowTimeline;

        if(timeline_view)
        {
            ShowTimeline();
        }
        else
        {
            ShowComparison();
        }

    }
    $window.scrollTo(0,0);

}]);

function generateGroupChart(div_name, title, dataPoints , label, classId, groupNo )
{
    var chart = new CanvasJS.Chart(div_name,
    {
        title:{
            text: title,
            fontSize: 20
        },
        animationEnabled: true,
        legend:{
            fontSize: 18,
            verticalAlign: "center",
            horizontalAlign: "left"
        },
        theme: "theme2",
        data: [
        {
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "<strong>{label}:</strong> #percent%",
            indexLabel: "{y} "+label ,
            click: function(e){
                window.location.href = "#/class/"+classId+"/"+groupNo+"/"+e.dataPoint.label
            },
            dataPoints:dataPoints
        }]
    });
    chart.render();
}