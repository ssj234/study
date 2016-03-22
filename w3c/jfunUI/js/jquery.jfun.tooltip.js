(function(){
	//对于动态添加的dom 不能够啊 需要提供新的方法，
$(document).ready(function(){
		
		//插入div
		var $body=$("body"),
			$document=$(document),
		 	$parent=$body;//$(".jfunTooltipMain")
		$body.append($("<div  id='jfun_tooltip' class='jfun_tooltip'><dl><dt id='jfun_tooltip_dt'><p>提示</p></dt><dd><div id='jfun_tooltip_div'>content</div></dd></dl></div>"));
		$tooltipDiv=$("#jfun_tooltip");

		var fixed,timeoutFun;

		//add delegate
		$parent.delegate(".jfunTooltipCtn","mouseenter",function(e){
			var $target=$(e.target),
				$target=$target.hasClass("jfunTooltipCtn")?$target:$target.closest(".jfunTooltipCtn");
				title=$target.attr("jfun_title"),
				width=$target.attr("jfun_width")||300,
				content=$target.attr("jfun_content");
			fixed=$target.hasClass("jfunTooltipFixed");
			$tooltipDiv.width(width+"px");
			if(title)
				$("#jfun_tooltip_dt>p").text(title);
			else
				$("#jfun_tooltip_dt").hide();

			if(content)
			{
				var contentFun;
				try{
					contentFun=eval(content);
				}catch(e2){
					contentFun=undefined;
				}
				if($.isFunction(contentFun))
				{
					content=contentFun();
					$("#jfun_tooltip_div").html(content);
				}else{
					$("#jfun_tooltip_div").text(content);
				}
				
			}
			
			
			$tooltipDiv.show()
			$tooltipDiv.css(getLocation(e,$tooltipDiv,$document));//.show();
			clearTimeout(timeoutFun);//
		}).delegate(".jfunTooltipCtn","mouseleave",function(e){
			if(!fixed){
				$tooltipDiv.hide();
			}else{
				//fixed hide after 3s set timer
				timeoutFun=setTimeout(hideTooltip,1000);
			}
		}).delegate(".jfunTooltipCtn","mousemove",function(e){
			if(!fixed)
				$tooltipDiv.css(getLocation(e,$tooltipDiv,$document));//.show();
		});

		$tooltipDiv.hover(function(){
			clearTimeout(timeoutFun);
		},function(){
			$tooltipDiv.hide();
		});
	});

//cala the position of tooltip where it will show
function getLocation(e,$tool,$document)
{
	var bdH=$document.height(),
		bdW=$document.width(),
		locX=e.pageX,
		locY=e.pageY;

	var toolWid=$tool[0].scrollWidth,
		toolHei=$tool[0].scrollHeight,
		locX=locX+toolWid+10>bdW?locX-toolWid-10:locX+10;
		locX=locX<0?10:locX;

		locY=locY+toolHei+10>bdH?locY-toolHei-10:locY+10;
		locY=locY<0?0:locY;
		return {top:locY,left:locX};
}
function hideTooltip()
{ 
	$tooltipDiv.hide();
}
})();