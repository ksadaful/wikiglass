// Variables below were declared in main controller
//var username = "";
//var fullname = "";
//var name = "";
//var listOfClasses = null;


mainApp.controller('ClassCtrl', ['$scope','$routeParams','$http' , '$window', function($scope, $routeParams,$http , $window) {

    if(!LoggedIn())
    {
        window.location.href = "#/login";
        CleanNavBar();
    }
    else
    {
        SetNavBar();
        var classID = $routeParams.class_id;
        $scope.className = classID;

        if(listOfClasses == null)
        {
            $http.get('php/getAllWikiPages.php').
                success(function(data, status, headers, config) {
                  listOfClasses = data;
                }).
                error(function(data, status, headers, config) {
                  alert("Error: Could not retrieve data from server!");
                });
        }
        if(listOfClasses != null)
        {
           if( listOfClasses.indexOf(classID) == -1 )
           {
              window.location.href = "#/dashboard";
           }
        }


        LogUserActivity(classID, ""  , ""  );


        var timeline_loaded = false;
        var comparison_loaded = false;

        function ShowComparison()
        {
         console.log("Comparison Button clicked");
         $scope.show_comp = true;
         $scope.show_time = false;
         timeline_view = false;
         LogUserActivity(classID, ""  , ""  );
         if(comparison_loaded) return;
         $http.get('php/getClassData.php?id='+ classID ).
             success(function(data, status, headers, config) {
                 var PagePoints = [];
                 var RevisionPoints = [];
                 var WordPoints = [];
                 for (i=0; i<data.Pbworks.length; i++){
                     PagePoints.push({y: parseInt(data.Pbworks[i]["page"]),          label: data.Pbworks[i]["groupNo"]});
                     RevisionPoints.push({y: parseInt(data.Pbworks[i]["revision"]),  label: data.Pbworks[i]["groupNo"]});
                     WordPoints.push({y: parseInt(data.Pbworks[i]["word"]),          label: data.Pbworks[i]["groupNo"]});
                 }
                 generateClassChart("PageChart",     "Number of Pages in Each Group",    "Group Number", "Number of Pages", "pages",     PagePoints       , classID);
                 generateClassChart("RevisionChart", "Revision Counts in Each Group",    "Group Number", "Revision Counts", "revisions", RevisionPoints   , classID);
                 generateClassChart("WordChart",     "Latest Word Counts in Each Group", "Group Number", "Word Counts",      "words"  ,   WordPoints       , classID);
             }).
             error(function(data, status, headers, config) {
               alert("Error: Could not retrieve data from server!");
             });
         comparison_loaded = true;
        }

        function ShowTimeline()
        {

         console.log("Timeline Button clicked");
         $scope.show_comp = false;
         $scope.show_time = true;
         timeline_view = true;
         LogUserActivity(classID, ""  , ""  );
         if(timeline_loaded) return;
         $http.get('php/getWeeklyRevisionCountByClassIdHighchart2.php?class_id='+ classID ).
             success(function(data, status, headers, config) {

 //                var Dates = data.dates;
 //                console.log("HIGHCHART: " );
 //                console.log(data.data);

                for(i = 0 ; i < data.data.length ; i++)
                {
                     var cumulative_revision_count = 0;
                     for(j = 0 ; j < data.data[i].data.length ; j++)
                     {
                        cumulative_revision_count = cumulative_revision_count + parseInt(data.data[i].data[j].y);
                        data.data[i].data[j].x = Date.parse(data.data[i].data[j].x);
                        data.data[i].data[j].y = cumulative_revision_count;
                     }
                }
                 console.log("MODIFIED DATA: " );
                 console.log(data.data);

                 $( function () {
                     $('#container2').highcharts({
                         chart: {
                             type: 'line'
                         },
                         title: {
                             text: 'Revision Count Timeline'
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
                                 text: 'Revision Counts'
                             },
                             min: 0
                         },
                         tooltip: {
                             headerFormat: '<b>{series.name}</b><br>',
                             pointFormat: '{point.x:%e. %b}: {point.y} Revision counts',
                             crosshairs: true
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
                                     lineWidth: 0.5
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

        }

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

function generateClassChart(div_name, title, x_title, y_title, label, dataPoints, classId)
{
    var chart = new CanvasJS.Chart(div_name,
    {
        title:{
            text: title,
            fontSize: 20
        },
        animationEnabled: true,
        axisY: {
            title: y_title
        },
        axisX: {
            title: x_title
        },
        theme: "theme2",
        data: [
        {
            type: "column",
            legendMarkerColor: "grey",
            toolTipContent: "<strong>Group {label}:</strong> {y} "+label,
            dataPoints: dataPoints,
            click: function(e){
                window.location.href = "#/class/"+classId+"/"+e.dataPoint.label
            }
        }]
    });
    chart.render();
}
