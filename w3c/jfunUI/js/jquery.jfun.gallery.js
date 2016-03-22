(function(){
	var liCnt="",
	$img=$(".jfun_gallery").find("img"),
	liCount=$img.length,queue=new Array(),
	showIndex=0,width=$img.width(),height=$img.height();
$(document).ready(function(){
	//1 add some div
	$(".jfun_gallery").append("<div class='nav'></div><span id='jfun_title'></span><ul id='jfun_point'></ul><div class='left'></div><div class='right'></div>");
	//2. set location
	$img.each(function(i){
		liCnt+="<li>o</li>";
		queue[i]=$(this).css("left",width*i);
	});
	//3.add li
	$("#jfun_point").append(liCnt);

	

	//4.add event
	$("#jfun_point").delegate("li","click",function(e){
		showPic(liCount-$(this).index()-1);
		e.stopPropagation();
	});
	//5.set loop
	setInterval(showPicAsy,3000);

	//6.show first
	showPic(0);

	//
	
	$(".jfun_gallery>.right").click(function(){
		if($("#jfun_gallery_bar").is(":animated"))
			return;
		showPic(++showIndex);
	});
	$(".jfun_gallery>.left").click(function(){
		if($("#jfun_gallery_bar").is(":animated"))
			return;
		showPic(--showIndex);
	});
});
setInterval(showPicAsy,3000);
function showPicAsy(){
	//alert("ww");
	//++showIndex;
	showPic(++showIndex);
	//setTimeout(showPicAsy,1000);
}

// -8 -7 -6 -5
// -4 -3 -2 -1
//  0  1  2  3
//  4  5  6  7 
//  8  9  10 11

//  -7 7/4=3  4-3  1
//  -6 6/4=2  4-2  2
//  7  7/4=3  3
function showPic(index)
{
	var mod=Math.abs(index)%liCount;
	if(index<0&&mod>0)
		mod=liCount-mod;
	var $show_img=$img.eq(mod);
	//set pre img
	var dest=-width*(mod);
	//document.title=dest+" "+mod;
	//show pic
	//动画结束后
	if($("#jfun_gallery_bar").is(":animated"))
			return;
	$("#jfun_gallery_bar").animate({"left":dest},500,function(){
		//set title
		$("#jfun_title").text($show_img.attr("alt"));
		//set color for li
		$("#jfun_point li").removeClass("select").eq(liCount-1-mod)
		.addClass("select");
	});
	showIndex=index;
}
})();