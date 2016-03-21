(function(window) {

	var paths={};//模块名与路径的映射
	var map={};//保存模块的依赖及构造函数
	var  readyRegExp = /^(complete|loaded)$/;
	//
	var require=function(array,callback){
		var i,len,
			count=0,args=[];//计数器
		for(i=0,len=array.length;i<len;i++){
			loadModule(array[i],i);//加载模块
		}

		function loadModule(name,index){
			var ret={},path,script,head;
			//获取path
			path=paths[name];
			require._loadingName=name;
			script=document.createElement("script");
			script.src=path+".js";
			script.id=name;
			//IE
			script.onreadystatechange=function(evt){
				if ( script.readyState=='loaded' || script.readyState === 'complete') {
					script.onload();
				}
			}
			script.onload=function(){
				map[name].flag=true;//加载成功
				ret=map[name].fn.apply(null,[]);
				args[index]=ret;
				count++;
				if(count==len){
					callback.apply(window,args);
				}
			}
			head=document.getElementsByTagName('head');
			head[0].appendChild(script);
		}
	};

	
	//配置路径映射
	require.config=function(obj){
		paths=obj;
	}

	//定义模块
	var define=function(deps,fn){
		map[getname()]={
			deps:deps,
			fn:fn,
			len:deps.length,
			args:[]
		};
	}

	var getname=function(){
		var ret=document.currentScript&&document.currentScript.id;
		if(ret)return ret;
		var scripts=document.getElementsByTagName("script"),
		i=0,len=scripts.length;
		for(;i<len;i++){
			if (scripts[i].readyState === 'interactive') {
                return scripts[i].id;
            }
        }
	}
	window.require=require;
	window.define=define;
})(window)
