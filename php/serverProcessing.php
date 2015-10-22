<?php
	header("Content-Type:text/html; charset=utf-8");

    //=========================== Production Database =========================================================
    $conn=mysqli_connect('ccmir','pbworks_usr','pbworks_usr') or die ('Failed to Connect '.mysqli_error($conn));

/*
    //=========================== Test Database =========================================================
    $conn=mysqli_connect('localhost','root','') or die ('Failed to Connect '.mysqli_error($conn));

*/

    mysqli_select_db($conn, 'pbworks_db') or die ('Failed to Access	DB'.mysqli_error());

    if (isset($_GET['getWiki'])) {
        $query = 'SELECT CONCAT(year,school,grade,class) AS wikiId 
                    FROM Wiki 
                    WHERE wiki_id LIKE "2014twgss%" 
                    OR wiki_id LIKE "2013twgss%" 
                    GROUP BY wikiId;';
        $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
        $json = array();
        while($row=mysqli_fetch_array($result)) {
            $json[]= array($row['wikiId']);
        }
        print json_encode(array('Pbworks'=>$json));
    }

    if (isset($_GET['classId'])) {
        $classId=$_GET['classId'];
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
    }

    if (isset($_GET['groupNo'])) {
        if (!isset($_GET['name'])) {
            $groupNo=$_GET['groupNo'];
            $query = 'SELECT User_name, Total_involved_pages, Total_involved_revisions, Total_words_addition, Total_words_deletion 
                        FROM User_stats_by_group
                        WHERE User_perm="write"
                        AND Group_id="'.$groupNo.'";';
            $result = mysqli_query($conn, $query) or die ('Failed to query '.   mysqli_error($conn));
            $json = array();
            while($row=mysqli_fetch_array($result)) {
                $json[]= array('name'=>$row['User_name'],'page'=>$row['Total_involved_pages'],'rev'=>$row['Total_involved_revisions'], 
                    'add'=>$row['Total_words_addition'], 'del'=>$row['Total_words_deletion']);
            }
            print json_encode(array('Pbworks'=>$json));
        } else {
            $groupNo=$_GET['groupNo'];
            $name=$_GET['name'];
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
        }
        
    }

?>