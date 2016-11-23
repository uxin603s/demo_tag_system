angular.module('app').component("tagSystem",{
	bindings:{},
	templateUrl:'app/components/tagSystem/tagSystem.html?t='+Date.now(),
	controller:["$scope","$element","tagSystem",function($scope,$element,tagSystem){
		$scope.width=1200;
		$scope.size=tagSystem.size;
		
		$($element)
			.find("iframe_pp")
				.append(tagSystem.iframe);
				
		tagSystem
			.init("../tag_system/public/index.php?tid=1&wid=1&t="+Date.now())
	}]
})