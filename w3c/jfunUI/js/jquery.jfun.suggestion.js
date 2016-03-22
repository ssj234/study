(function(){
	//点击某些li并不需要切换div 而是在一个div上执行事件
	//如何传入事件
$(document).ready(function(){

		$(document.body).append("<ul id='jfun_suggestion_ul'></ul>");
		var $jfun_sug_ul=$("#jfun_suggestion_ul");
		var $cur_text,indexSel=0;
		//输入框
		$(":text.jfun_suggestion").bind("keyup focus",function(e){
			if($(this).nextAll("#jfun_suggestion_ul").size()==0)
			{
				$jfun_sug_ul.remove();
				$(this).parent().append("<ul id='jfun_suggestion_ul'></ul>");
				$jfun_sug_ul=$("#jfun_suggestion_ul");
				addEvent($jfun_sug_ul);
			}
			if(e.keyCode==40)//点击下
			{
				//获得当前选择的li
				
				$(this).blur();
				$jfun_sug_ul.show();
				$jfun_sug_ul.children("li").eq(0).children("a").focus();
				return;
			}
			var value=$(this).val(),fun=$(this).attr("onchange");
			if(!fun)
				return;
			//输入为空不再做处理，由用户处理
			var array=eval(fun+"('"+value+"')");
			var htmlstr="";
			if(array.length>0){
				for (var i = array.length - 1; i >= 0; i--) {
					htmlstr+="<li><a href='"+array[i].value+"'>"+array[i].key+"</a></li>";
				};
				$jfun_sug_ul.empty();
				$jfun_sug_ul.html(htmlstr);
				//$jfun_sug_ul.width($(this).outerWidth()+"px");
				$jfun_sug_ul.css("min-width","300px");
				//由于是fixed 获取offset 再减去scrolltop
				var top_v=$(this).outerHeight()+$(this).offset().top-$(document).scrollTop();
				//var top_v=$(this).outerHeight()+$(this).offset().top;
				$jfun_sug_ul.css("top",top_v+"px");
				$jfun_sug_ul.css("left",$(this).offset().left+"px");
				$jfun_sug_ul.show();
				$cur_text=$(this);
				indexSel=0;
			}
			
		});
		//输入框，没用
		/*$(":text.jfun_suggestion").bind("blur",function(){
			//$jfun_sug_ul.empty();//不能清空是因为点击下时，
			//$jfun_sug_ul.hide();
		});*/
		/*不能删啊  因为可能是document*/
		addEvent($jfun_sug_ul);
		
		/*$jfun_sug_ul.bind("li","blur",function(e){
			$jfun_sug_ul.empty();
			$jfun_sug_ul.hide();
		});*/

		//点击其他 清空提示框
		$(document).bind("click",function(e){
			if($(e.target).closest("#jfun_suggestion_ul").size()==0&&
				!$(e.target).hasClass("jfun_suggestion")){
				$jfun_sug_ul.empty();
				$jfun_sug_ul.hide();
				$jfun_sug_ul.blur();
				e.stopPropagation();
			}
		});
		//滚动时 清空提示框
		$(document).bind("scroll",function(e){
			if($(e.target).closest("#jfun_suggestion_ul").size()==0&&
				!$(e.target).hasClass("jfun_suggestion")){
				$jfun_sug_ul.empty();
				$jfun_sug_ul.hide();
				$jfun_sug_ul.blur();
				e.stopPropagation();
			}
		});

		//为提示框添加事件
		function addEvent ($jfun_sug_ul) {
			//阻止滚动条
			$jfun_sug_ul.delegate("a","keydown",function(e){
				e.preventDefault();
				e.stopPropagation();
			});
			//key up
			$jfun_sug_ul.delegate("a","keyup",function(e){
				var $li=$jfun_sug_ul.children("li"),
				len=$li.length;
				if(e.keyCode==40)
				{
					//document.title="<-"+indexSel;
					//获得当前选择的li
					if(indexSel==len-1)
						indexSel=-1;
					$li.eq(++indexSel).children("a").focus();
					
				} 
				if(e.keyCode==38)
				{
					//document.title="->"+indexSel;
					//获得当前选择的li
					if(indexSel==0)
						indexSel=len;
					$li.eq(--indexSel).children("a").focus();
					
				}
				e.preventDefault();
				e.stopPropagation();
			});
			//点击和回车 
			$jfun_sug_ul.delegate("a","click keydown",function(e){
				
				if(e.keyCode==13||!e.keyCode){
					//enter
					var $tar=$(e.target).closest("a");
					if($tar.attr("href")=="#"){
						$cur_text.val($.trim($tar.text()));
						setTimeout(function(){
							$cur_text.focus()
						},200);
					}
					if(e.keyCode==13)
						location.href=$tar.attr("href");
					$jfun_sug_ul.hide();
					$tar.blur();//fix for press enter still....
				}

			});
			//end
		}
	});
})();