<?php
	header("Content-type:text/html;charset=utf-8");
	
	$conn = mysql_connect("localhost","root","root");
	$id = $_REQUEST["id"];
	
	if($conn){
		// 选择数据库
		mysql_select_db("littleswan");
		
		$result = mysql_query("select * from chat where id = '$id'",$conn);
		
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