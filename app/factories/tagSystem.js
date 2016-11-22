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
				for(var i in res.value){
					data.list[i]=res.value[i];
				}
			}
			$rootScope.$apply();
		})
		
		
	}
	var init=function(src){
		iframe.src=src;
	}
	
	
	var getTag=function(ids){
		postMessageHelper
		.send("tagSystem",{name:'getTag',value:ids})
	}
	return {
		init:init,
		data:data,
		iframe:iframe,
		getTag:getTag,
	}
}])