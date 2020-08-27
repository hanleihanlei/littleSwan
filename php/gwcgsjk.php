<?php
	// 支持中文
	header("Content-type:text/html;charset=utf-8");
	
	//连接html与php
	$id = $_REQUEST["id"];
	
	// 1连接php与数据库
	$conn = mysql_connect("localhost","root","root");
	
	if($conn){
		// 2.选择数据库
		mysql_select_db("littleswan");
		
		mysql_query("delete from chat where id='$id'");
	}
	else{
		echo "连接失败";
	}
	
	mysql_close($conn);
?>