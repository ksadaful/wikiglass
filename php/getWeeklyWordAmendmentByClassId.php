<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $classID=$_GET['class_id'];


    $Query = 'SELECT group_id , ts_week_start , SUM(word_amendment_count) AS amendment_count FROM `weekly_word_amendment` WHERE group_id LIKE "'.$classID.'%" GROUP BY ts_week_start ORDER BY group_id ' ;
    $Results = mysqli_query($conn, $Query) or die ('Failed to query '.mysqli_error($conn));
    $Data = array();
    while($row=mysqli_fetch_array($Results)) {
        $Data[]= array( 'group_id' => $row['group_id'] , 'week_start' => $row['ts_week_start'] , 'amendment_count' => $row['amendment_count'] ) ;
    }
    print json_encode(array('data'=> $Data) );

?>
