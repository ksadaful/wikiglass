<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $groupNo=$_GET['groupNo'];
    $classId=$_GET['classId'];

    if (empty($groupNo) || empty($classId) )
    {
         $response_message = array('status' => 404, 'message' => "Missing arguments. Class ID and Group Number needed");
         echo json_encode($response_message);
         return;
    }

    $query = 'SELECT User_name, Total_involved_pages, Total_involved_revisions, Total_words_addition, Total_words_deletion
                FROM User_stats_by_group
                WHERE User_perm="write"
                AND Group_id="'.$groupNo.'";';
    $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
    $json = array();
    while($row=mysqli_fetch_array($result)) {
        $json[]= array('name'=>$row['User_name'],'page'=>$row['Total_involved_pages'],'rev'=>$row['Total_involved_revisions'],
            'add'=>$row['Total_words_addition'], 'del'=>$row['Total_words_deletion']);
    }
    print json_encode(array('Pbworks'=>$json));


?>
