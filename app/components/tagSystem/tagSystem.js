angular.module('app',[]).component("tagSystem",{
	bindings:{},
	templateUrl:'app/components/tagSystem/tagSystem.html?t='+Date.now(),
	controller:["$scope","$element","tagSystem",function($scope,$element,tagSystem){
		$scope.width=500;
		$scope.search=tagSystem.data.search;
		$scope.tagList=tagSystem.data.list;
		$scope.size=tagSystem.data.size;		
		$($element).find("iframe_pp").append(tagSystem.iframe);
		tagSystem.init("../tag_system/public/index.php?tid=1&wid=1&t="+Date.now())
		$scope.list=[
			{id:1},
			{id:2},
			{id:3},
			{id:4},
		]
		var ids=$scope.list.map(function(val){
			return val.id
		})
		tagSystem.getTag(ids)
		
		
		
	}]
})