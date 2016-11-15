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
		
		iframe.src="../tag_system/public/index.php?tid=1&wid=1&t="+Date.now();
		$($element).find("div").append(iframe)
		// console.dir(iframe)
		
		iframe.onload=function(){
			var source=iframe.contentWindow;
			
			postMessageHelper.init("tagSystem-search",source)
			postMessageHelper.send("tagSystem-search")
			postMessageHelper.receive("tagSystem-search",function(res){
				console.log(res)
				$scope.$apply();
			})
			postMessageHelper.init("tagSystem-resize",source)
			postMessageHelper.send("tagSystem-resize")
			postMessageHelper.receive("tagSystem-resize",function(res){
				$scope.resize=res
				$scope.$apply();
			})

		}
		// postMessageHelper.slave('tagSystem-resize',{
			// w:w,
			// h:h,
		// })
		/*
		slave
		get count,relation,tagName,levelList
		*/
		// var pack={
			// source:source,
			// connect:'tagSystem-tree',
		// }
		// postMessageHelper.master(pack,function(res){
			// console.log(res)//
			// $scope.$apply();
		// })
		
		
	}]
})