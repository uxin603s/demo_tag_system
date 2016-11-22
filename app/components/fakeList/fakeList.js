angular.module('app').component("fakeList",{
	bindings:{},
	templateUrl:'app/components/fakeList/fakeList.html?t='+Date.now(),
	controller:["$scope","tagSystem","cache",function($scope,tagSystem,cache){
		$scope.cache=cache;
		$scope.tagSystem=tagSystem;
		$scope.list=[];
		var get=function(qq){
			clearTimeout($scope.getTimer);
			$scope.getTimer=setTimeout(function(){
				console.log('get')
				var ids=tagSystem.search_result;
				var list=[
					{id:1},
					{id:2},
					{id:3},
					{id:4},
				];
				if(ids && cache.tagSearch){
					$scope.list=list.filter(function(val){
						return ids.indexOf(val.id)!=-1
					});
				}else{
					$scope.list=list;
				}
				
				tagSystem.getTag($scope.list.map(function(val){
					return val.id;
				}));
				
				$scope.$apply();
			},500)
		}
		$scope.$watch("tagSystem.search_result",get,1);
		$scope.$watch("cache.tagSearch",get,1);
		// $scope.$watch("cache.edit_id",function(edit_id){
			
			// var ids=[];
			// for(var i in edit_id){
				// if(edit_id[i]){
					// ids.push(i*1)
				// }
			// }
			// tagSystem.getTag(ids);
		// },1)
		// tagSystem.getTag(ids)
		
	}]
})