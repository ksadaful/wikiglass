<?php
    session_start();
    if (isset($_SESSION["time_created"]))
    {
        if(time() - $_SESSION["time_created"]  > 1800){
            unset($_SESSION["username"]);
            unset($_SESSION["fullname"]);
            unset($_SESSION["time_created"]);
            $response_message = array('status' => 404, 'message' => "User not logged in");
            echo json_encode($response_message);
            return;
        }
        else
        {
            $_SESSION["time_created"] = time();
        }
    }
    if (isset($_SESSION["username"]))
	{
	    $response_message = array('status' => 200, 'message' => "User already logged in", 'username' => $_SESSION['username'], "fullname" => $_SESSION['fullname']);
        echo json_encode($response_message);
        return;

    } else
    {
       $response_message = array('status' => 404, 'message' => "User not logged in");
	   echo json_encode($response_message);
	   return;
    }
?>
