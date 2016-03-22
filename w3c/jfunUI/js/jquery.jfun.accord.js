(function(){
$(document).ready(function(){
		var $jfun_accord=$(".jfun_accord");
		$jfun_accord.find(".box:first").show();	
		$jfun_accord.find(".title:first").addClass("jfun_open").css("backgroundPosition", "2px 4px");

		$jfun_accord.find(">li>.title").click(function(){
			//若this有open 则return
			var $title=$(this);
			if($title.hasClass("jfun_open"))
			{
				return;
			}
			//若this无open 则关闭open的，去掉open 并打开this
			var closeBox=$title.closest(".jfun_accord").find(">li>.jfun_open");
			closeBox.removeClass("jfun_open");
			closeBox.css("backgroundPosition", "2px -42px");
			closeBox.next().slideUp();
			//show
			$title.addClass("jfun_open").css("backgroundPosition", "2px 4px").next(".box").slideDown();
			
		});
	});
})();