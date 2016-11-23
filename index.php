<!DOCTYPE html>
<html>
	<head>
		<script src="js/jquery-1.12.4.min.js?t=<?=time()?>"></script>
		<script src="js/angular-1.5.8.min.js?t=<?=time()?>"></script>
		<script src="js/postMessageHelper/postMessageHelper.js?t=<?=time()?>"></script>
		<script src="js/localForage-1.4.2.min.js?t=<?=time()?>"></script>
		<script src="app/app.js?t=<?=time()?>"></script>
		
		
		<script src="app/directives/ngEnter/ngEnter.js?t=<?=time()?>"></script>
		<script src="app/components/fakeList/fakeList.js?t=<?=time()?>"></script>
		<script src="app/components/tagSystem/tagSystem.js?t=<?=time()?>"></script>
		
		<script src="app/factories/tagSystem.js?t=<?=time()?>"></script>
		<script src="app/factories/cache.js?t=<?=time()?>"></script>
		
		
		<link rel="stylesheet" type="text/css" href="css/bootstrap-3.3.7.min.css?t=<?=time()?>" />
		<link rel="stylesheet" type="text/css" href="css/index.css?t=<?=time()?>" />

	</head>
	<body ng-app="app" class="container-fluid"  >
		<tag-system ></tag-system>	
		<fake-list></fake-list>
	</body>
</html>
