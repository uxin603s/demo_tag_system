angular.module('app')
.factory('tagSystem',['$rootScope',function($rootScope){
	var data={
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
	var init=function(src){
		iframe.onload=function(){
			source=iframe.contentWindow;
			postMessageHelper.init("tagSystem",source)
			postMessageHelper.send("tagSystem")
			postMessageHelper.receive("tagSystem",function(res){
				if(res.name=="resize"){
					data.size.w=res.value.w
					data.size.h=res.value.h
				}
				if(res.name=="idSearchTag"){
					data.tagList=res.value;
				}
				if(res.name=="insert"){
					data.insert=res.value
				}
				$rootScope.$apply();
			})
		}
		iframe.src=src;
	}
	var setMode=function(value){
		postMessageHelper
			.send("tagSystem",{name:'setMode',value:value})
	}
	var tagSearchId=function(value){
		postMessageHelper
			.send("tagSystem",{name:'tagSearchId',value:value})
	}
	var idSearchTag=function(value){
		postMessageHelper
			.send("tagSystem",{name:'idSearchTag',value:value})
	}
	var idSearchSelect=function(value){
		postMessageHelper
			.send("tagSystem",{name:'idSearchSelect',value:value})
	}
	

	

	
	return {
		init:init,
		iframe:iframe,
		data:data,
		setMode:setMode,
		tagSearchId:tagSearchId,
		idSearchTag:idSearchTag,
		idSearchSelect:idSearchSelect,
	}
}])