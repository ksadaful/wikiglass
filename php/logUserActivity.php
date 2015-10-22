<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

     $event = 'click' ;
    if(!empty($_POST['username'])) {    $username = $_POST['username'] ;} else {  $username = 'unidentified'; }
    if(!empty($_POST['class'])) {       $class_id = $_POST['class'] ;} else {  $class_id = null; }
    if(!empty($_POST['group'])) {       $group_no = $_POST['group'] ;} else {  $group_no = null; }
    if(!empty($_POST['student'])) {     $student = $_POST['student'] ;} else {  $student = null; }
    if(!empty($_POST['chart_type'])) {  $chart_type = $_POST['chart_type'] ;} else {  $chart_type = null; }


    $query = 'INSERT INTO Activitylog (username,event,class_no,group_no,student_name,chart_type) VALUES ("'.$username.'","'.$event.'","'.$class_id.'","'.$group_no.'","'.$student.'","'.$chart_type.'");';
    echo $query;
    $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
    echo $result;

?>
