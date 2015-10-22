<?php
    session_start();
    try
    {
        unset($_SESSION["username"]);
        unset($_SESSION["fullname"]);
        unset($_SESSION["time_created"]);
        $response_message = array('status' => 200, 'message' => "'Logout successful" );

    }
    catch(Exception $e)
    {
      $response_message = array('status' => 404, 'message' => $e->getMessage() );
    }
    echo json_encode($response_message);
    return;
?>
