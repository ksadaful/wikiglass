<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $classID= $_GET['class_id'];

    $query_time_values = 'SELECT DISTINCT ts_week_start FROM Weekly_revision_count WHERE group_id LIKE "'.$classID.'%"   ORDER BY  ts_week_start' ;
    $query_group_ids = 'SELECT DISTINCT group_id FROM Weekly_revision_count WHERE group_id LIKE "'.$classID.'%"   ORDER BY  group_id' ;


    $result_dates = mysqli_query($conn, $query_time_values) or die ('Failed to query '.mysqli_error($conn));
    $json_Dates = array();
    while($row=mysqli_fetch_array($result_dates))
    {
        $json_Dates[]= $row['ts_week_start'] ;
    }

    $result_group_id = mysqli_query($conn, $query_group_ids) or die ('Failed to query '.mysqli_error($conn));
    $json_group_id = array();
    $json_group_id_data = array();

    while($row=mysqli_fetch_array($result_group_id))
    {
        $current_group_id = $row['group_id'] ;
        $query = 'SELECT group_id, revision_count, ts_week_start FROM Weekly_revision_count WHERE group_id LIKE "'.$current_group_id.'%" ORDER BY group_id, ts_week_start' ;

        $result_group_id_data = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
        $data = array();
        while($row = mysqli_fetch_array($result_group_id_data))
        {
            $data[]=  array(  $row['ts_week_start'], $row['revision_count']  ) ;
        }

        $json_group_id[]= $current_group_id ;
        $json_group_id_data[]=  array('name'=> 'Group '.substr($current_group_id, -1)  , 'data'=> $data) ;

    }



    print json_encode( array('dates'=>$json_Dates, 'data'=>$json_group_id_data) );

?>
