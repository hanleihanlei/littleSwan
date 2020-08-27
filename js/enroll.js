// 注册页面的表单验证
$(function(){
	let userName = $(".enroll_phone");
	let userPwd01 = $(".enroll_pwd_01");
	let userPwd02 = $(".enroll_pwd_02");
	let userForm = $("#enroll_form");
	let flagName = null;
	let flagPwd01 = null;
	let flagPwd02 =null;
	
	userName.blur(function(){
		let str = this.value;
		let regName = /^\d{11}$/;
		if(str == ""){
			$(".error01").css({display:"none"});
		}
		else{
			if(regName.test(str)){
				flagName = true;
				// $(".error01").css({display:"none"});
			}
			else{
				flagName = false;
				$(".error01").css({display:"block"});
			}
		}
	});
	userName.click(function(){
		$(".error01").css({display:"none"});
	});
	
	userPwd01.blur(function(){
		let str = this.value;
		// console.log(str);
		let regPwd01 = /^\w{6,20}$/;
		if(str == ""){
			$(".error02").css({display:"none"});
		}
		else{
			if(regPwd01.test(str)){
				flagPwd01 = true;
			}
			else{
				flagPwd01 = false;
				$(".error02").css({display:"block"});
			}
		}
	});
	userPwd01.click(function(){
		$(".error02").css({display:"none"});
	});
	
	userPwd02.blur(function(){
		let str = this.value;
		// console.log(str);
		// console.log(userPwd01[0].value);
		// console.log($(".enroll_pwd_01").val());
		if(str == ""){
			$(".error03").css({display:"none"});
		}
		else{
			if(userPwd01[0].value == str){
				flagPwd02 = true;
			}
			else{
				flagPwd02 = false;
				$(".error03").css({display:"block"});
			}
		}
	});
	userPwd02.click(function(){
		$(".error03").css({display:"none"});
	});
	
	
	// 判断当前输入的用户名在数据库中是否存在，来决定能否注册成功
	$(".enter").click(function(){
		if(flagName && flagPwd01 && flagPwd02){
			$.ajax({
				url: "php/enroll.php",
				type: 'post',
				data: "username="+$(".enroll_phone").val()+"&userpwd="+$(".enroll_pwd_02").val(),
				//HTTP请求格式
				success:function(data){
					// console.log(data);
					if(data == "注册成功,快去登录吧"){
						alert(data);
						$(location).prop('href','login.html');
					}
					else{
						$(".error04").css({display:"block"});
					}
				},
				error:function(xhr,type,errorThrown){
					alert("后台连接失败");
				}
			});
		}
	});
	
	// 当提示用户名已存在，注册失败后点击账号输入框让提示信息消失
	$(".enroll_phone").click(function(){
		$(".error04").css({display:"none"});
	});
});