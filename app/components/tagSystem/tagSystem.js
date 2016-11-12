angular.module('app',[]).component("tagSystem",{
	bindings:{},
	templateUrl:'app/components/tagSystem/tagSystem.html?t='+Date.now(),
	controller:["$scope","$element",function($scope,$element){
		$scope.width=600
		var iframe=document.createElement("iframe");
		iframe.style="width:100%;height:100%;"
		iframe.setAttribute("marginwidth",0);
		iframe.setAttribute("marginheight",0);
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("frameborder",0);
		
		iframe.src="../tag_system/public/index.php?tid=1&wid=3&t="+Date.now();
		$($element).find("div").append(iframe)
		// console.dir(iframe)
		var pmHelp=function(source,sendData,callback){
			sendData.id=Date.now();
			source.postMessage(sendData,"*")
			window.addEventListener("message",function(e){
				if(e.data.id==sendData.id){
					callback && callback(e.data)
				}
			},false)
		}
		iframe.onload=function(){
			$scope.connectTimer=setInterval(function(){
				pmHelp(iframe.contentWindow,{status:0,type:'tagSystem'},function(result){
					// console.log(result)
					if(result.status==1){
						clearTimeout($scope.connectTimer);
					}else if(result.status==2){
						console.log(result.data)
					}
					$scope.$apply();
				})
				// iframe.contentWindow.postMessage({status:0,type:'tagSystem'},"*")
			},1000)
		}
		
		
	}]
})