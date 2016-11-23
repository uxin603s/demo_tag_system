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
				var ids=tagSystem.search_result;
				var list=[
					{id:1},
					{id:2},
					{id:3},
					{id:4},
				];
				if(cache.tagSearch && ids){
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
			},0)
		}
		
		$scope.$watch("cache",function(cache){
			if(!cache)return
			$scope.$watch("tagSystem.search_result",$scope.get,1);
			$scope.$watch("cache.tagSearch",$scope.get,1);
			$scope.$watch("cache.edit_id",function(edit_id){
				var ids=[];
				for(var i in edit_id){
					if(edit_id[i]){
						ids.push(i*1)
					}
				}
				tagSystem.set("selectIds",ids)
			},1)
		});
		
		
		$scope.addTag=function(id,tag){
			if(tagSystem.tagList[id].indexOf(tag.name)==-1){
				tagSystem.tagList[id].push(tag.name);
				tagSystem.addTag(id,tag.name);
				delete tag.name;
			}
		}
		tagSystem.set("addTag",$scope.addTag)
		$scope.delTag=function(id,index){
			// console.log(id,index)
			tagSystem.tagList[id].splice(index,1);
			tagSystem.delTag(id,index);
		}
		
		
		
		
		
	}]
})