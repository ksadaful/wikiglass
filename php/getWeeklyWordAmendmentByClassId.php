<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $classID=$_GET['class_id'];

    //GET ALL UNIQUE GROUP IDS
    $query_group_ids = 'SELECT DISTINCT group_id FROM Weekly_word_amendment WHERE group_id LIKE "'.$classID.'%"   ORDER BY  group_id' ;
    $result_group_id = mysqli_query($conn, $query_group_ids) or die ('Failed to query '.mysqli_error($conn));
    $json_data = array();

    while($row=mysqli_fetch_array($result_group_id))
    {
        $current_group_id = $row['group_id'] ;
        $query = 'SELECT ts_week_start, SUM(word_amendment_count) as word_amendment_count FROM Weekly_word_amendment WHERE group_id LIKE "'.$current_group_id.'%" GROUP BY ts_week_start';
        $result_group_id_data = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
        $data = array();
        while($row = mysqli_fetch_array($result_group_id_data))
        {
            $data[]=  array( 'x' => $row['ts_week_start'], 'y'=> $row['word_amendment_count'], 'url' => '#/class/'.$classID."/".substr($current_group_id, -1) ) ;
        }

        $json_group_id[]= $current_group_id ;
        $json_data[]=  array('name'=> 'Group '.substr($current_group_id, -1)  , 'data'=> $data) ;

    }


    print json_encode( array('data'=>$json_data) , JSON_UNESCAPED_SLASHES );

?>
