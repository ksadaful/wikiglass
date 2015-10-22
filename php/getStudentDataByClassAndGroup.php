<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    $groupNo=$_GET['groupNo'];
    $name=$_GET['name'];

    if (empty($groupNo) || empty($name) )
    {
         $response_message = array('status' => 404, 'message' => "Missing arguments. Class ID+Group Number or Name");
         echo json_encode($response_message);
         return;
    }

    $query = 'SELECT Page.page_name,
                IFNULL(User_stats_by_page.No_of_involved_revision,0) AS revision,
                IFNULL(User_stats_by_page.Total_words_addition,0) As addition,
                IFNULL(User_stats_by_page.Total_words_deletion,0) AS deletion
                FROM User_stats_by_page RIGHT OUTER JOIN Page
                ON Page.page_id=User_stats_by_page.Page_id
                AND User_stats_by_page.User_name="'.$name.'"
                WHERE Page.page_id LIKE "'.$groupNo.'%"
                GROUP BY Page.page_id
                ORDER BY SUBSTR(Page.page_id FROM 1 FOR 15), SUBSTR(Page.page_id FROM 16)*1;';
    mysqli_query($conn, "SET NAMES 'utf8'");
    if( function_exists('mysqli_set_charset') ){
        mysqli_set_charset($conn, 'utf8');
    }else{
        mysqli_query($conn, "SET NAMES 'utf8'");
    }
    $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
    $json = array();
    while($row=mysqli_fetch_array($result)) {
        $json[]= array('page'=>$row['page_name'],'revByPage'=>$row['revision'], 'addByPage'=>$row['addition'], 'delByPage'=>$row['deletion']);
    }
    print json_encode(array('Pbworks'=>$json), JSON_UNESCAPED_UNICODE);

?>
