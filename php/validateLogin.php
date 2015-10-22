<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $user=$_POST['username'];
	$pw=$_POST['password'];

	$query = 'SELECT * FROM loginUser WHERE user="'.mysql_real_escape_string($user).'" AND password="'.mysql_real_escape_string($pw).'";';
	$result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
    $count=mysqli_num_rows($result);

	if ($count==1)
	{
		$row = mysqli_fetch_array($result, MYSQLI_NUM);
		$_SESSION['time_created'] = time();
		if(empty($row[2]) )
		{
			$_SESSION['user'] = 'User';
		}
		else
		{
			$_SESSION['fullname'] = $row[3];
			$_SESSION['username'] = $row[1];
		}
		$response_message = array('status' => 200, 'message' => "Login Successful!");
        echo json_encode($response_message);
        return;
	}
	else
	{
        $response_message = array('status' => 404, 'message' => "Wrong Username or Password!");
        echo json_encode($response_message);
        return;
	}

?>
