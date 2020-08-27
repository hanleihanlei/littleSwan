$(function() {
	let login = JSON.parse(localStorage.getItem("login"));
	// 点击首页用户标签，判断当前是否已登录账号
	$(".item_a").click(function() {
		if (login == 1) {
			$(location).prop('href', 'shoppingChat.html');
		} else {
			$(location).prop('href', 'login.html');
		}
	});
	
	$.getJSON("json/goodsOfList.json",function(data){
		$.each(data,function(index,result){
			console.log(result.img);
			$("<li>"+
				"<a href='#' class='item_a'>"+
					"<div class='item_img'>"+
						"<img src="+result.img+" >"+
					"</div>"+
					"<div class='item_text'>"+
						"<p class='text_01'>" + result.p01 + "</p>"+
						"<p class='text_02'>" + result.p02 + "</p>"+
					"</div>"+
					"<div class='item_price'>"+
						"<p>" + result.p03 + "</p>"+
						"<p>" + result.p04 + "</p>"+
					"</div>"+
				"</a>"+
				"<p class='price_down'>直降600元</p>"+
			"</li>").appendTo($(".list_items"));
		});
	});
});
