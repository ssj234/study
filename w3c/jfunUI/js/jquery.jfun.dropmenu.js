(function(){
	//点击某些li并不需要切换div 而是在一个div上执行事件
	//如何传入事件
$(document).ready(function(){
		var $jfun_dropmenu=$(".jfun_dropmenu"),
		$jfun_dropmenuA=$jfun_dropmenu.children("a"),
		$jfun_dropmenuUl=$jfun_dropmenu.children("ul"),
		$jfun_dropmenuLi=$jfun_dropmenuUl.children("li");
		
		$(document).bind("click",function(){
			$jfun_dropmenuUl.hide();
			$jfun_dropmenuA.css("background","#51a351");

		});
		
		$jfun_dropmenuA.click(function(e){
			var $tar=$(this).next(":hidden");
			$jfun_dropmenuUl.hide();
			$tar.show(200);
			$jfun_dropmenuA.css("background","#51a351");
			$(this).css("background","red");
			e.stopPropagation();
		});

		var $subLi=$jfun_dropmenuLi.find("ul").closest("li"),
		$subA=$subLi.children("a");
		$subLi.addClass("jfun_sub_menu");
		$subA.append("<span class='sub_caret'></span>");
		$subA.css("href","#");
		$subLi.hover(function(){
			$(this).children("ul").show();
			//$(this).children("ul").
		},function(){
			$(this).children("ul").hide();
		});
	});
})();