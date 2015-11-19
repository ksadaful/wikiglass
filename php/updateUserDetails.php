<?php
	session_start();

    require 'createDatabaseConnection.php';
    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());
    $imcomplete_data = false;

    if(!empty($_POST['fullname'])) {  $fullname = $_POST['fullname'] ;} else {  $imcomplete_data = true; }
    if(!empty($_POST['password']))  {  $password = $_POST['password'] ;}   else {  $imcomplete_data = true; }
    if(!empty($_POST['username']))  {  $username = $_POST['username'] ;}   else {  $imcomplete_data = true; }
    if(!empty($_POST['email']))     {  $email = $_POST['email'] ;}         else {  $imcomplete_data = true; }


    if($imcomplete_data)
    {
        $response_message = "Missing some information. Please Re-input.";
        $response_code = 404;
        echo json_encode( array("code"=> $response_code, "message"=> $response_message));
        return;
    }

    $UpdateUser = 'UPDATE loginUser SET
                                    password = "'.$password.'",
                                    full_name = "'.$fullname.'",
                                    email = "'.$email.'"
                                    WHERE loginUser.user = "'.$username.'"' ;
    $InsertUserResult = mysqli_query($conn, $UpdateUser) or die ('Failed to query '.   mysqli_error($conn));
    $response_message = "Changes saved";
    $response_code = 200;
    echo json_encode( array("code"=> $response_code, "message"=> $response_message));
    return;
?>
