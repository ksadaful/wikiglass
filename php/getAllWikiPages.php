<?php
	session_start();

    require 'createDatabaseConnection.php';

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());
    $query = 'SELECT CONCAT(year,school,grade,class) AS wikiId
                        FROM Wiki
                        WHERE wiki_id LIKE "2014twgss%"
                        OR wiki_id LIKE "2013twgss%"
                        GROUP BY wikiId;';
    $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
    $json = array();
    while($row=mysqli_fetch_array($result))
    {
       $json[]= $row['wikiId'];
    }
    echo json_encode($json);
?>
