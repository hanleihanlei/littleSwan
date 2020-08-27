<?php
	// 支持中文
	header("Content-type:text/html;charset=utf-8");
	
	//连接html与php
	$id = $_REQUEST["id"];
	$num = $_REQUEST["num"];
	$img = $_REQUEST["img"];
	$information = $_REQUEST["information"];
	$color = $_REQUEST["color"];
	$size = $_REQUEST["size"];
	$price = $_REQUEST["price"];
	
	// 1连接php与数据库
	$conn = mysql_connect("localhost","root","root");
	
	if($conn){
		// 2.选择数据库
		mysql_select_db("littleswan");
		
		$result = mysql_query("select * from chat where id = '$id'",$conn);
		
		$rows = mysql_num_rows($result);
		
		if($rows == 1){
			mysql_query("update chat set num=num+'$num'");
			echo "数据库里已经有这个商品了，给它的num加上传入的值吧";
		}
		else{
			mysql_query("insert into chat(id,img,information,color,size,price,num) values('$id','$img','$information','$color','$size','$price','$num')");
			echo "购物车里没有这个商品，将信息渲染进去吧";
		}
	}
	else{
		echo "连接失败";
	}
	
	mysql_close($conn);
?>