angular.module('app').factory('tagSystem',['$rootScope',function($rootScope){
	var data={
		search:[],
		list:{},
		size:{
			w:0,
			h:0,
		}
	}
	var iframe=document.createElement("iframe");
	iframe.style="width:100%;height:100%;"
	iframe.setAttribute("marginwidth",0);
	iframe.setAttribute("marginheight",0);
	iframe.setAttribute("scrolling","no");
	iframe.setAttribute("frameborder",0);
	var source;
	iframe.onload=function(){
		source=iframe.contentWindow;
		postMessageHelper.init("tagSystem",source)
		postMessageHelper.send("tagSystem")
		postMessageHelper.receive("tagSystem",function(res){
			if(res.name=="search"){
				data.search.splice(0,data.search.length)
				for(var i in res.value){
					data.search.push(res.value[i]);
				}
			}else if(res.name=="resize"){
				data.size.w=res.value.w
				data.size.h=res.value.h
			}else if(res.name=="getTag"){
				data.list=res.value
			}
			$rootScope.$apply();
		})
		
		
	}
	
	iframe.src="../tag_system/public/index.php?tid=1&wid=3&t="+Date.now();
	var get_source=function(callback){
		var timer=setInterval(function(){
			if(source){
				callback && callback(source);
				clearTimeout(timer);
			}
		},500)
	}
	var getTag=function(ids){
		postMessageHelper.send("tagSystem",{name:'getTag',value:ids})
	}
	return {
		data:data,
		iframe:iframe,
		get_source:get_source,
		getTag:getTag,
	}
}])