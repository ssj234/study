(function(){
	//点击某些li并不需要切换div 而是在一个div上执行事件
	//如何传入事件
$(document).ready(function(){

		$(document.body).append("<ul id='jfun_suggestion_ul'></ul>");
		var $jfun_sug_ul=$("#jfun_suggestion_ul");
		var $cur_text,indexSel=0;
		//输入框
		$(":text.jfun_suggestion").bind("keyup focus",function(e){
			if(e.keyCode==40)//点击下
			{
				//获得当前选择的li
				$jfun_sug_ul.children("li").eq(0).children("a").focus();
				$(this).blur();
				$jfun_sug_ul.show();
				return;
			}
			var value=$(this).val(),fun=$(this).attr("onchange");
			if(!fun)
				return;
			// if(value=="")//输入为空不再做处理，由用户处理
			// {
			// 	$jfun_sug_ul.empty();
			// 	$jfun_sug_ul.hide();
			// 	return;
			// }
			var array=eval(fun+"('"+value+"')");
			var htmlstr="";
			if(array.length>0){
				for (var i = array.length - 1; i >= 0; i--) {
					htmlstr+="<li><a href='"+array[i].value+"'>"+array[i].key+"</a></li>";
				};
				$jfun_sug_ul.empty();
				$jfun_sug_ul.html(htmlstr);
				$jfun_sug_ul.width($(this).width()+"px");
				$jfun_sug_ul.css("top",10+$(this).innerHeight()+$(this).offset().top+"px");
				$jfun_sug_ul.css("left",$(this).offset().left+"px");
				$jfun_sug_ul.css("z-index",9999);
				$jfun_sug_ul.show();
				$cur_text=$(this);
				indexSel=0;
			}
			
		});
		//输入框
		$(":text.jfun_suggestion").bind("blur",function(){
			//$jfun_sug_ul.empty();//不能清空是因为点击下时，
			//$jfun_sug_ul.hide();
		});
		//点击和回车 
		$jfun_sug_ul.delegate("a","click keydown",function(e){
			
			if(e.keyCode==13||!e.keyCode){
				//enter
				var $tar=$(e.target).closest("a");
				if($tar.attr("href")=="#")
					$cur_text.val($tar.text().trim());
				if(e.keyCode==13)
					location.href=$tar.attr("href");
				$jfun_sug_ul.hide();
				$(this).blur();//fix for press enter still....
			}

		});
		$jfun_sug_ul.delegate("a","keyup",function(e){
			var $li=$jfun_sug_ul.children("li"),
			len=$li.length;
			if(e.keyCode==40)
			{
				//获得当前选择的li
				if(indexSel==len-1)
					indexSel=-1;
				$li.eq(++indexSel).children("a").focus();
				
			} 
			if(e.keyCode==38)
			{
				//获得当前选择的li
				if(indexSel==0)
					indexSel=len;
				$li.eq(--indexSel).children("a").focus();
				
			}
			e.preventDefault();
			e.stopPropagation();
		});
		//阻止滑动
		$jfun_sug_ul.delegate("a","keydown",function(e){
			e.preventDefault();
			e.stopPropagation();
		});
		
		$jfun_sug_ul.bind("li","blur",function(e){
			$jfun_sug_ul.empty();
			$jfun_sug_ul.hide();
		});
		$(document).bind("click",function(e){
			if($(e.target).closest("#jfun_suggestion_ul").size()==0&&
				!$(e.target).hasClass("jfun_suggestion")){
				$jfun_sug_ul.empty();
				$jfun_sug_ul.hide();
				$jfun_sug_ul.blur();
				e.stopPropagation();
			}
		});
	});
})();