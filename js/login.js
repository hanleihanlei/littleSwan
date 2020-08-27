// 登录页面的表单验证
$(function(){
	let userName = $(".login_phone");
	let userPwd = $(".login_pwd");
	let btn = $(".enter");
	let flagName = null;
	let flagPwd = null;
	
	
	btn.click(function(){
		let str = userName.val();
		let pwd = userPwd.val();
		// 判断点击登录按钮时账号框是否为空
		if(str == ""){
			$(".error01").css({display:"block"});
		}
		else{
			$(".error01").css({display:"none"});
			flagName = true
		}
		// 判断点击登录按钮时密码框是否为空
		if(pwd ==""){
			$(".error02").css({display:"block"});
		}
		else{
			$(".error02").css({display:"none"});
			flagPwd = true;
		}
		
		// 点击登录按钮时两个框都不为空时才有效，进行后端判断
		if(flagName && flagPwd){
			$.ajax({
				url: "php/login.php",
				type: 'post',
				data: "username="+$(".login_phone").val()+"&userpwd="+$(".login_pwd").val(),
				// HTTP请求格式
				success: function(data){
					if(data == "登录成功"){
						alert(data);
						$(location).prop('href','homePage.html');
						
						let ls = localStorage;
						ls.setItem("login","1");
					}
					else{
						$(".error03").css({display:"block"});
						let ls = localStorage;
						ls.setItem("login","0");
					}
				},
				error: function(xhr,type,errorThrown){
					alert("后台连接失败");
				}
			});
		}
	});
	
	$(".login_phone").focus(function(){
		$(".error01").css({display:"none"});
		$(".error03").css({display:"none"});
	});
	$(".login_pwd").focus(function(){
		$(".error02").css({display:"none"});
	});
});

