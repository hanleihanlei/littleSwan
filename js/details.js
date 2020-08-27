// 点击底下的小图片，更改大图片和超大图片
$(function() {
	let oLi = $(".thumbnails li");
	// let om = document.querySelector(".show_case");
	for (let i = 0; i < oLi.length; i++) {
		oLi.eq(i).click(function() {
			$(".show_case").css({
				backgroundImage: "url" + "(./images/imgDetails/show0" + (i + 1) + "s.webp)"
			});
			$(".big_box").css({
				backgroundImage: "url" + "(./images/imgDetails/show0" + (i + 1) + "b.webp)"
			});
			// "background-image":"url"+"(./images/imgDetails/show0"+(i+1)+"s.webp)"
			// om.style.backgroundImage = "url(./images/imgDetails/show0"+(i+1)+"s.webp)";
			// 点击小图片，更换当前小图片的指示位置
			$(".thumbnails li").eq(i).css({
				border: "2px solid #f60",
				margin: "0 10px 0 0",
				opacity: 1
			});
			$(".thumbnails li").eq(i).siblings().css({
				border: "1px solid #d6d6d6",
				margin: "1px 10px 1px 1px",
				opacity: 0.4
			});
		});
	}
});

// 放大镜js代码
class Magnifier {
	constructor(newSmallBox, newBigBox, newMask) {
		this.smallBox = newSmallBox;
		this.bigBox = newBigBox;
		this.mask = newMask;
	}

	//设置鼠标滑上smallBox时，bigBox和mask的style的display属性变成block
	onmouseover() {
		let that = this;
		this.smallBox.onmouseover = function() {
			that.bigBox.style.display = "block";
			that.mask.style.display = "block";
		}
	}
	//设置鼠标滑出smallBox时，display属性变成none
	onmouseout() {
		let that = this;
		this.smallBox.onmouseout = function() {
			that.bigBox.style.display = "none";
			that.mask.style.display = "none";
		}
	}

	//分析onmousemove
	//mask如何跟着鼠标移动走，鼠标在mask中间
	onmousemove() {
		let that = this;
		this.smallBox.onmousemove = function(evt) {
			let e = evt || event;
			let left = e.pageX - that.smallBox.offsetLeft - that.mask.offsetWidth + 20;
			let top = e.pageY - that.smallBox.offsetTop - that.mask.offsetHeight - 80;

			//边界问题
			if (left < 0) {
				left = 0;
			}

			if (top < 0) {
				top = 0;
			}
			let maxLeft = that.smallBox.offsetWidth - that.mask.offsetWidth;
			if (left > maxLeft) {
				left = maxLeft;
			}
			let maxTop = that.smallBox.offsetHeight - that.mask.offsetHeight;
			if (top > maxTop) {
				top = maxTop;
			}

			that.mask.style.left = left + "px";
			that.mask.style.top = top + "px";

			//分析mask移动时bigbox的移动规则
			//比例尺
			//	小图片:大图片 = 小窗口移动多少:大窗口移动多少
			// that.mask.offsetWidth * x = left * that.bigBox.offsetWidth;
			let x = that.bigBox.offsetWidth * left / that.mask.offsetWidth;
			let y = that.bigBox.offsetHeight * top / that.mask.offsetHeight;
			//背景图片的定位backgroundPositionX	backgroundPositionY
			//给x和y取反是为了固定窗口，让图片移动
			that.bigBox.style.backgroundPositionX = -x + "px";
			that.bigBox.style.backgroundPositionY = -y + "px";
		}
	}
}

// 放大镜的测试代码
let oSmallBox = document.querySelector(".show_case");
let oBigBox = document.querySelector(".big_box");
let oMask = document.querySelector(".mask");

let mf = new Magnifier(oSmallBox, oBigBox, oMask);

//测试代码
mf.onmouseover();
mf.onmouseout();
mf.onmousemove();


// 收藏点亮星星
$(function(){
	$(".share .share_right i").eq(0).click(function(){
		$(".share .share_right i").css({
			backgroundImage:"url(./images/imgDetails/headJump02.png)",
			backgroundPositionX:"-25px",
			backgroundPositionY:"-23px"
		});
	});
});

// 动态渲染页面，将goods表格里的数据取出来渲染给详情页面
$(function(){
	$.ajax({
		url: "php/details.php",
		type: 'get',
		data: "id=a1",
		
		success:function(data){
			fun1(data);
			
		},
		error:function(xhr,type,errorThrown){
			alert("后台连接失败");
		}
	});
});

function fun1(data){
	let obj = JSON.parse(data);
	let bImg = obj[0].bimg.split(",");
	let sImg = obj[0].simg.split(",");
	let ssImg = obj[0].ssimg.split(",");
	let infor = obj[0].information;
	let size = obj[0].size;
	let color = obj[0].color;
	let price = obj[0].price;

	$(".big_box").css({
		backgroundImage:"url(./images/imgDetails/" + bImg[0] + ")"
	});
	$(".show_case").css({
		backgroundImage:"url(./images/imgDetails/" + sImg[0] + ")"
	});
	for(let i = 0; i < ssImg.length; i++){
		$("#img0" + (i + 1)).attr("src","images/imgDetails/" + ssImg[i]);
	}
	$(".titlee01").html(infor);
	$(".spec_list").html(size);
	$(".colorh").html(color);
	$(".newprice").html(price);
}

// 点击按钮增减商品数量
$(function(){
	let index = Number($(".goods_numm").val());
	
	$(".pre").click(function(){
		if($(".goods_numm").val() > 1){
			$(".goods_numm").val(--index);
		}
	});
	$(".nex").click(function(){
			$(".goods_numm").val(++index);
	});
});


// 提取详情页数据，发送到chat表格里
$(function(){
	$(".chat").click(function(){
		$.ajax({
			url: "php/xqygsjk.php",
			type: 'get',
			data: "id=a1"
			+"&img="+$("#img01").attr("src")
			+"&information="+$(".titlee01").html()
			+"&color="+$(".colorh").html()
			+"&size="+$(".spec_list").html()
			+"&price="+$(".newprice").html()
			+"&num="+$(".goods_numm").val()
			,
			success:function(data){
				// alert(data);
			},
			error:function(xhr,type,errorThrown){
				alert("后台连接失败");
			}
		});
	});
});

// 根据当前localStorage的值来判断点击后跳转的页面
$(function(){
	let login = JSON.parse(localStorage.getItem("login"));
	$(".chat").click(function(){
			if(login == 1){
				$(location).prop('href','shoppingChat.html');
			}
			else{
				$(location).prop('href','login.html');
			}
	});
});