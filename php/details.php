<?php
	header("Content-type:text/html;charset=utf-8");

	$id = $_REQUEST["id"];
	$conn = mysql_connect("localhost","root","root");
	
	if($conn){
		// 选择数据库
		mysql_select_db("littleswan");
		
		$result = mysql_query("select * from goods where id = '$id'",$conn);
		$b = array();
		while($a = mysql_fetch_assoc($result)){
			$b[] = $a;
		}

		echo json_encode($b);
	}
	else{
		echo "连接失败";
	}
	
	mysql_close($conn);
?>