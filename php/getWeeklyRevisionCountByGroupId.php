<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $groupID=$_GET['group_id'];

    $query = 'SELECT group_id, revision_count, ts_week_start FROM weekly_revision_count WHERE group_id LIKE "'.$groupID.'%"' ;

    $result = mysqli_query($conn, $query) or die ('Failed to query '.mysqli_error($conn));
    $json = array();
    while($row=mysqli_fetch_array($result)) {
        $json[]= array('week_start'=>$row['ts_week_start'] , 'revision_count'=>$row['revision_count']);
    }
    print json_encode($json);

?>
