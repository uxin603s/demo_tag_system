angular.module('app').component("tagSystem",{
	bindings:{},
	templateUrl:'app/components/tagSystem/tagSystem.html?t='+Date.now(),
	controller:["$scope","$element","tagSystem",function($scope,$element,tagSystem){
		$scope.width=1200;
		$scope.size=tagSystem.data.size;
		
		$($element)
			.find("iframe_pp")
				.append(tagSystem.iframe);
				
		tagSystem
			.init("../tag_system_front/index.php?t="+Date.now())
	}]
})