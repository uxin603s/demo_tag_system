angular.module('app').component("fakeList",{
bindings:{},
templateUrl:'app/components/fakeList/fakeList.html?t='+Date.now(),
controller:["$scope","tagSystem","cache",function($scope,tagSystem,cache){
	cache.search || (cache.search=[]);
	$scope.tagSystem=tagSystem.data;
	$scope.$watch("tagSystem.insert",function(value){
		if(!value)return;
		console.log(value)
		
		delete tagSystem.data.insert;
	},1)
	$scope.list=[];
	$scope.search={
		list:cache.search,
		add:function(tag){
			var index=this.list.indexOf(tag.name);
			if(index==-1){
				this.list.push(tag.name);
				tag.name='';
			}
		},
		del:function(index){
			this.list.splice(index,1);
		},
	}
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
			tagSystem.idSearchTag(angular.copy(list));
			$scope.$apply();
		},0);
	}
	$scope.$watch("cache.mode",function(value){
		tagSystem.setMode(value);
		$scope.get();
	});
	$scope.$watch("cache.search",function(value){
		tagSystem.tagSearchId(value);
	},1);
		
	$scope.$watch("list",function(list){
		var result=[];
		for(var i in list){
			if(list[i].insert_flag){
				result.push(list[i].id)
			}
		}
		tagSystem.idSearchSelect(result);
	},1)
	$scope.add=tagSystem.addIdRelation;
	$scope.del=tagSystem.delIdRelation;
	
}]
})