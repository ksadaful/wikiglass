<?php
	session_start();

    require 'createDatabaseConnection.php';
    $username=$_GET['username'];

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());
    $query = 'SELECT class_id FROM class_teacher WHERE teacher LIKE "%'.$username.'%"';
    $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
    $json = array();
    while($row=mysqli_fetch_array($result))
    {
       $json[]= $row['class_id'];
    }
    echo json_encode($json);
?>
