angular.module("main")
	.factory("lazyLoadService",["$log",function($log){
		return {
			test: function(){
				return "lazyLoadServer.test";
			}
		}
	}])
	.directive("uxHello",[function(){
		return {
			restrict: "EAC",
			template: '<div>This is ux-hello directive.</div>',
			replace: true
		}
	}]).filter("amt",function(){
		return function(input) {
			if (input) {
				return "$"+input;
			}
		};
	});

angular.module("newmod",[]);