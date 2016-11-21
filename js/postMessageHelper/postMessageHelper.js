var postMessageHelper={
	connect:{},
	sendTimer:{},
	init:function(connect,post_window,callback){
		var self=this;
		self.connect[connect]={
			post_window:post_window,
			status:0,//1代表連線
		};
	},
	send:function(connect,sendData){
		var self=this;
		
		self.connect[connect] || (self.connect[connect]={});
		
		var send={
			sendData:sendData,
			connect:connect,
			status:self.connect[connect].status,
		}
		if(self.connect[connect].status){
			self.connect[connect].post_window.postMessage(send,"*");
		}else {
			var timer=setInterval(function(){
				if(self.connect[connect].post_window)
					self.connect[connect].post_window.postMessage(send,"*");
				if(self.connect[connect].status){
					clearTimeout(timer);
				}
				
			},500)
			window.addEventListener("message",function(e){
				if(e.data.connect!=connect)return;
				if(e.data.status==2){
					clearTimeout(timer);
					self.connect[connect].status=1;
				}
			},false);
		}
		
	},
	receive:function(connect,callback){
		var self=this;
		self.connect[connect] || (self.connect[connect]={});
		window.addEventListener("message",function(e){
			if(e.data.connect!=connect)return;
			if(e.data.status==2)return;
			if(e.data.status==0){
				var send={
					status:2,
					connect:connect,
				}
				e.source.postMessage(send,"*");
				self.connect[connect].post_window=e.source;
				self.connect[connect].status=1;
			}
			callback && callback(e.data.sendData);
		},false);
	},
}

