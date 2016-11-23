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
	iframe.setAttribute("scrolling","no");
	iframe.setAttribute("frameborder",0);
	var source;
	var init=function(src){
		iframe.onload=function(){
			// console.log('onload')
			source=iframe.contentWindow;
			postMessageHelper.init("tagSystem",source)
			postMessageHelper.send("tagSystem")
			postMessageHelper.receive("tagSystem",function(res){
				if(res.name=="search"){
					data.search.splice(0,data.search.length)
					for(var i in res.value){
						data.search[i]=res.value[i];
					}
				
				}else if(res.name=="resize"){
					data.size.w=res.value.w
					data.size.h=res.value.h
				}
				else if(res.name=="getTag"){
					for(var i in data.tagList){
						delete data.tagList[i]
					}
					for(var i in res.value){
						data.tagList[i]=res.value[i];
					}
				}else if(res.name=="selectTag"){
					for(var i in data.selectIds){
						var id=data.selectIds[i];
						data.addTag(id,{name:res.value})
					}
				}
				$rootScope.$apply();
			})
		}
		iframe.src=src;
	}
	
	var addTag=function(id,name){
		postMessageHelper
			.send("tagSystem",{name:'addTag',value:{id:id,name:name}})
	}
	var delTag=function(id,index){
		postMessageHelper
			.send("tagSystem",{name:'delTag',value:{id:id,index:index}})
	}
	var getTag=function(ids){
		postMessageHelper
			.send("tagSystem",{name:'getTag',value:ids})
	}

	var set=function(name,value){
		data[name]=value;
	}
	return {
		init:init,
		set:set,
		size:data.size,
		search_result:data.search,
		tagList:data.tagList,
		addTag:addTag,
		delTag:delTag,
		
		getTag:getTag,
		
		iframe:iframe,
		
	}
}])