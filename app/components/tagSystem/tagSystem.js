angular.module('app',[]).component("tagSystem",{
	bindings:{},
	templateUrl:'app/components/tagSystem/tagSystem.html?t='+Date.now(),
	controller:["$scope","$element",function($scope,$element){
		$scope.width=400
		var iframe=document.createElement("iframe");
		iframe.style="width:100%;height:100%;"
		iframe.setAttribute("marginwidth",0);
		iframe.setAttribute("marginheight",0);
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("frameborder",0);
		
		iframe.src="../tag_system/public/index.php?tid=1&wid=3&t="+Date.now();
		$($element).find("div").append(iframe)
		// console.dir(iframe)
		
		iframe.onload=function(){
			var pack={
				source:iframe.contentWindow,
				connect:'tagSystem',
			}
			postMessageHelper.master(pack,function(res){
				console.log(res)
				$scope.$apply();
			})
		}
		
		
	}]
})