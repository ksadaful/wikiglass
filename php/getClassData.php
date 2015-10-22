<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());
    $classId=$_GET['id'];
    $query = 'SELECT Group_Stats.Group_index, Group_Stats.No_of_pages, Group_Stats.No_of_words, sum(Page_Stats.No_of_revisions) AS No_of_revisions
                FROM Page_Stats,Group_Stats
                WHERE Group_Stats.Wiki_id
                LIKE "'.$classId.'%"
                AND Page_Stats.Wiki_id=Group_Stats.Wiki_id
                GROUP BY Group_Stats.Wiki_id;';
    $result = mysqli_query($conn, $query) or die ('Failed to query '.	mysqli_error($conn));
    $json = array();
    while($row=mysqli_fetch_array($result)) {
        $json[]= array('groupNo'=>$row['Group_index'],'page'=>$row['No_of_pages'], 'revision'=>$row['No_of_revisions'], 'word'=>$row['No_of_words']);
    }
    print json_encode(array('Pbworks'=>$json));

?>
