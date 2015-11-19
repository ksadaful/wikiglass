<?php
	session_start();

    require 'createDatabaseConnection.php';

    $username = $_GET["username"];
    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());
    $CheckExistingUser = 'SELECT *  FROM loginUser WHERE user = "'.$username.'"';
    $returnval ="";
    $result = mysqli_query($conn, $CheckExistingUser) or die ('Failed to query '.   mysqli_error($conn));
    while($row=mysqli_fetch_array($result))
    {
        $returnval = array('username'=>$row['user'],'fullname'=>$row['full_name'],'email'=>$row['email'], 'password'=>$row['password']);
    }
    echo json_encode($returnval);
    return;
?>
