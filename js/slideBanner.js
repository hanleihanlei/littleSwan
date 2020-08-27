// 滑动轮播图
$(function(){
	$.fn.extend({
		slideBanner:function(){
			let box = $(this)[0];
			let x = 0;
			function slide(){
				// 根据li的宽度和个数获取ul的宽度
				$(box).find("ul").width($(box).find("li").length * ($(box).find("li").width() + 12));
				// 下一个按钮
				$(box).find("button").eq(1).click(function(){
					x++;
					if(x >= $(box).find("li").length - 4){
						x = ($(box).find("li").length - 4)
					}
					$(box).find("ul").stop().animate({
						left: -x * ($(box).find("li").width() + 12)
					},1000);
				});
				// 上一个按钮
				$(box).find("button").eq(0).click(function(){
					x--;
					if(x <= 0){
						x = 0;
					}
					$(box).find("ul").stop().animate({
						left: -x * ($(box).find("li").width() + 12)
					},1000);
				});
			}
			slide();
		}
	});
});