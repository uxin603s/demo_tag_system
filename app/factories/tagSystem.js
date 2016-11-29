angular.module('app')
.factory('tagSystem',['$rootScope',function($rootScope){
	var data={
		search:[],
		list:{},
		tagList:{},
		addTag:[],
		size:{
			w:0,
			h:0,
		}
	}
	var iframe=document.createElement("iframe");
	iframe.style="width:100%;height:100%;"
	iframe.setAttribute("marginwidth",0);
	iframe.setAttribute("marginheight",0);
	// iframe.setAttribute("scrolling","no");
	iframe.setAttribute("frameborder",0);
	var source;
	var init=function(src){
		iframe.onload=function(){
			source=iframe.contentWindow;
			postMessageHelper.init("tagSystem",source)
			postMessageHelper.send("tagSystem")
			postMessageHelper.receive("tagSystem",function(res){
				if(res.name=="resize"){
					// console.log(res)
					data.size.w=res.value.w
					data.size.h=res.value.h
				}
				
				$rootScope.$apply();
			})
		}
		iframe.src=src;
	}
	// postMessageHelper
		// .send("tagSystem",{name:'addTag',value:{id:id,name:name}})

	

	
	return {
		init:init,
		iframe:iframe,
		size:data.size,
	}
}])