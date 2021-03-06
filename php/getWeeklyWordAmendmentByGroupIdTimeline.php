<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $groupID=$_GET['group_id'];


    // GET ALL UNIQUE TIME WHEN STUDENTS CONTRIBUTED
    $GetAllDates = 'SELECT DISTINCT ts_week_start FROM Weekly_word_amendment WHERE group_id LIKE "'.$groupID.'%"' ;
    $DatesResult = mysqli_query($conn, $GetAllDates) or die ('Failed to query '.mysqli_error($conn));
    $Dates = array();
    while($row=mysqli_fetch_array($DatesResult)) {
        $Dates[]= $row['ts_week_start'];
    }

    //GET STUDENT NAMES FIRST
    $StudentNames = 'SELECT DISTINCT student_name FROM Weekly_word_amendment WHERE group_id LIKE "'.$groupID.'%" ORDER BY student_name' ;

    $StudentNamesResult = mysqli_query($conn, $StudentNames) or die ('Failed to query '.mysqli_error($conn));
    $StudentNamesArray = array();
    $StudentNamesDataArray = array();

    while($row=mysqli_fetch_array($StudentNamesResult))
    {
        // FOR EACH STUDENT, LOOK UP THEIR DATA
        $CurrentStudentName= $row['student_name'] ;
        $StudentDataQuery = 'SELECT word_amendment_count, ts_week_start FROM Weekly_word_amendment WHERE group_id LIKE "'.$groupID.'%" AND student_name LIKE "'.$CurrentStudentName.'"ORDER BY  ts_week_start' ;
        $StudentDataQueryResult = mysqli_query($conn, $StudentDataQuery) or die ('Failed to query '.mysqli_error($conn));
        $data = array();
        $parameters = explode("gp", $groupID);
        while($row=mysqli_fetch_array($StudentDataQueryResult)) {
            $data[]= array('x' => $row['ts_week_start'] , 'y' => $row['word_amendment_count'], 'url' => '#/class/'.$parameters[0]."/".$parameters[1]."/".$CurrentStudentName );
        }
        $StudentNamesArray[] = $CurrentStudentName;
        $StudentNamesDataArray[] = array('name' => $CurrentStudentName , 'data'=> $data ) ;
    }


    print json_encode(array('data'=>$StudentNamesDataArray ), JSON_UNESCAPED_SLASHES );

?>
