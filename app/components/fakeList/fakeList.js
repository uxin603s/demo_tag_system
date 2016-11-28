angular.module('app').component("fakeList",{
	bindings:{},
	templateUrl:'app/components/fakeList/fakeList.html?t='+Date.now(),
	controller:["$scope","tagSystem","cache",function($scope,tagSystem,cache){
		$scope.cache=cache;
		$scope.tagSystem=tagSystem;
		$scope.list=[];
		$scope.get=function(){
			clearTimeout($scope.getTimer);
			$scope.getTimer=setTimeout(function(){
				
				var list=[
					{id:1,title:'gogo'},
					{id:2,title:'eqwe'},
					{id:3,title:'ggyt'},
					{id:4,title:'bbds'},
				];
				
				$scope.list=list;
				
				$scope.$apply();
			},0)
		}
		
		
		
	}]
})