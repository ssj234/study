(function(){
$(document).ready(function(){
	$(".jfun_modal_dialog").bind("click",function(e){
		var $tar=$(e.target),
			clazz=$tar.attr('class'),
			$hideTar=$tar.closest('.jfun_modal_dialog');
		
		if(clazz=="jd_modal"||clazz=="jd_close")
			$hideTar.fadeOut();
		e.stopPropagation();
	});
	$(document).bind("keyup",function(e){
		if(e.keyCode==27)
			$(".jfun_modal_dialog").fadeOut();
	});
});
})();