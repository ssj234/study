(function(){
	//点击某些li并不需要切换div 而是在一个div上执行事件
	//如何传入事件
$(document).ready(function(){
		var $jfun_tab=$(".jfun_tab"),
		$jfun_tabDiv=$jfun_tab.find("div"),
		$jfun_tabLi=$jfun_tab.find("li");
		$jfun_tabDiv.eq(0).show();

		$jfun_tab.find("ul").delegate("li","click",function(e){
			var $li=$(e.target).closest("li");
			if($li.hasClass("selected"))
				return;
			$jfun_tabLi.removeClass("selected");
			$jfun_tabDiv.hide();
			$jfun_tabDiv.eq($jfun_tabLi.index($li)).show();
			$li.addClass("selected");
		});
	});
})();