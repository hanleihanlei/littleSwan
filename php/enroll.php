<?php
	// 支持中文
	header("Content-type:text/html;charset=utf-8");
	
	//连接html与php
	$name = $_POST["username"];
	$pwd = $_POST["userpwd"];
	
	// 1连接php与数据库
	$conn = mysql_connect("localhost","root","root");
	
	if($conn){
		// 2.选择数据库
		mysql_select_db("littleswan");
		
		$result = mysql_query("select * from account where name = '$name'",$conn);
		
		$rows = mysql_num_rows($result);
		
		if($rows == 1){
			echo "用户已存在,注册失败";
		}
		else{
			mysql_query("insert into account(name,pwd) values('$name','$pwd')");
			echo "注册成功,快去登录吧";
		}
	}
	else{
		echo "连接失败";
	}
	
	mysql_close($conn);
?>