<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    if(!empty($_GET['username'])) {    $username = $_GET['username'] ;}
    else {  echo "Username required"; return; }
    $query = 'SELECT ts, class_no, group_no, student_name, chart_type  FROM Activitylog WHERE username LIKE"'.$username.'" ORDER BY ts DESC';
    $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));

    $data = array();
    while($row=mysqli_fetch_array($result))
    {
        $data[]=  array(
                    'time' => $row['ts'],
                    'class' => $row['class_no'],
                    'group' => $row['group_no'],
                    'student' => $row['student_name'],
                    'chart type' => $row['chart_type']
                    );
    }

    print json_encode( array('data'=>$data) );

?>
