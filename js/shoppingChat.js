// 通过当前的数量乘以单价得出小计的值
function fun2(){
		let newprice = $(".chat_price p").html();
		let much = $(".chat_total").html();
		much = newprice * Number($(".num").val());
		$(".chat_total_h").html(much);
	}
// 
function fun3(){
		let newprice = $(".chat_price p").html();
		let much = $(".chat_total").html();
		much = newprice * Number($(".num").val());
		$(".heji02").html(much);
}

// 从chat表格中取出数据，动态渲染购物车中的商品内容
$(function(){
	$.ajax({
		url: "php/shoppingChat.php",
		type: 'get',
		data: "id=a1",
		
		success:function(data){
			fun1(data);
			fun2();
			fun3();
			fun4();
		},
		error:function(xhr,type,errorThrown){
			alert("后台连接失败");
		}
	});
	
});

function fun1(data){
	let obj = JSON.parse(data);
	let ssImg = obj[0].img;
	let infor = obj[0].information;
	let size = obj[0].size;
	let color = obj[0].color;
	let price = obj[0].price;
	let num = obj[0].num;
	
	// $(".chat_imgg").attr("src",ssImg);
	// $(".chat_product_02").html(infor);
	// $(".chat_sku_01").html(color);
	// $(".chat_sku_02").html(size);
	// $(".chat_price p").html(price);
	// $(".num").val(num);
	// console.log(1);
	
	let str = 
	`<div class="chat_list">
		<div class="item_title">
			<div class="item_choose_wrap">
				<div class="item_choose"></div>
			</div>
			<div class="shop_detail">
				<i class="icon_shop"></i>
				小天鹅官方商城
			</div>
		</div>
		<div class="item_list">
			<!-- 点击按钮 -->
			<div class="item_choose_wrap">
				<div class="item_choose"></div>
			</div>
			<div class="chat_img">
				<img src="${ssImg}" class="chat_imgg">
			</div>
			<div class="chat_product chat_product_02">
				${infor}
			</div>
			<div class="chat_sku">
				<span class="chat_sku_01">${color}</span>
				<span class="chat_sku_02">${size}</span>
			</div>
			<div class="chat_price">
				<p>${price}</p>
			</div>
			<div class="chat_btn">
				<span class="min">
					<i class="inner"></i>
				</span>
				<input type="text" class="num" value="${num}">
				<span class="plus">
					<i class="inner"></i>
				</span>
			</div>
			<div class="chat_total chat_total_h"></div>
			<div class="chat_del">删除</div>
		</div>
	</div>`;
	$(".cart_list").html(str);
	
	// 购物车中删除按钮绑定事件，并更改后台数据
	$(".chat_del").click(function(){
		$(".item_list").remove();
		$.ajax({
			url: "php/gwcgsjk.php",
			type: 'get',
			data: "id=a1",
			
			success:function(data){
				fun5();
			},
			error:function(xhr,type,errorThrown){
				alert("后台连接失败");
			}
		});
		fun3();
	});
	
	
	// 购物车中商品数量的点击按钮绑定事件
	let index = Number($(".num").val());
	// console.log(typeof index);
	$(".min").click(function(){
		if($(".num").val() > 1){
			$(".num").val(--index);
			fun2();
			fun3();
		}
	});
	$(".plus").click(function(){
		
			$(".num").val(++index);
			fun2();
			fun3();
		
	});
}

function fun4(){
	$(".chat_detail").css({
		display:"block"
	});
	$(".chat_list").css({
		display:"block"
	});
	$(".chat_body").css({
		display:"none"
	});
}

function fun5(){
	$(".chat_detail").css({
		display:"none"
	});
	$(".chat_list").css({
		display:"none"
	});
	$(".chat_body").css({
		display:"block"
	});
	
}
		
		