var eventUtil={

	"getEvent":function(e)
	{
		return e?e:window.event;
	},
	"getTarget":function(e)
	{
		e=e?e:window.event;
		return e.target?e.target:e.srcElement;//IE is window.event.srcElement  e.target
	},
	"addEvent":function(ele,name,handler)
	{
		if(ele.addEventListener)
		{
			ele.addEventListener(name,handler,false);
		}else if(ele.attachEvent)
		{
			ele.attachEvent('on'+name,handler);
		}else{
			ele['on'+name]=handler;
		}
	},
	"removeEvent":function(ele,name,handler)
	{
		if(ele.removeEventListener)
		{
			ele.removeEventListener(name,handler,false);
		}else if(ele.detachEvent)
		{
			ele.detachEvent('on'+name,handler);
		}else{
			ele['on'+name]=null;
		}
	},
	"stopPropagation":function(event)
	{
		if(event.stopPropagation)
		{
			event.stopPropagation();
		}else
		{
			event.cancelBubble=true;
		}
	},
	"preventDefault":function(event)
	{
		if(event.preventDefault)
		{
			event.preventDefault();
		}else
		{
			event.returnValue=false;
		}
	}
}