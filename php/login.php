<?php
	//支持中文
	header("Content-type:text/html;charset=utf-8");
	
	//连接html与php
	$name = $_POST["username"];
	$pwd = $_POST["userpwd"];
	
	// 1.连接php与数据库
	$conn = mysql_connect("localhost","root","root");
	
	if($conn){
		// 2.选择数据库
		mysql_select_db("littleswan");
		
		$result = mysql_query("select * from account where name = '$name' and pwd = '$pwd'",$conn);
		
		$rows = mysql_num_rows($result);
		if($rows == 1){
			echo "登录成功";
		}
		else{
			echo "账号或密码错误";
		}
	}
	else{
		echo "连接失败";
	}
	
	mysql_close($conn);
?>