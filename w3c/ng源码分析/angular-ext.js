angular.module('angular-ext', []).value('angular-ext', {});

function minErr(module) {
	  return function () {
	    var code = arguments[0],
	      prefix = '[' + (module ? module + ':' : '') + code + '] ',
	      template = arguments[1],
	      templateArgs = arguments,
	      stringify = function (obj) {
	        if (typeof obj === 'function') {
	          return obj.toString().replace(/ \{[\s\S]*$/, '');
	        } else if (typeof obj === 'undefined') {
	          return 'undefined';
	        } else if (typeof obj !== 'string') {
	          return JSON.stringify(obj);
	        }
	        return obj;
	      },
	      message, i;

	    message = prefix + template.replace(/\{\d+\}/g, function (match) {
	      var index = +match.slice(1, -1), arg;

	      if (index + 2 < templateArgs.length) {
	        arg = templateArgs[index + 2];
	        if (typeof arg === 'function') {
	          return arg.toString().replace(/ ?\{[\s\S]*$/, '');
	        } else if (typeof arg === 'undefined') {
	          return 'undefined';
	        } else if (typeof arg !== 'string') {
	          return toJson(arg);
	        }
	        return arg;
	      }
	      return match;
	    });

	    message = message + '\nhttp://errors.angularjs.org/1.2.12/' +
	      (module ? module + '/' : '') + code;
	    for (i = 2; i < arguments.length; i++) {
	      message = message + (i == 2 ? '?' : '&') + 'p' + (i-2) + '=' +
	        encodeURIComponent(stringify(arguments[i]));
	    }

	    return new Error(message);
	  };
}

var msie = int((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1]);
if (isNaN(msie)) {
	  msie = int((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1]);
}

function int(str) {
	  return parseInt(str, 10);
}

function isFunction(value){return typeof value === 'function';}

function cleanupClosure(obj) {
	for (var i in obj) {
		if (!obj.hasOwnProperty(i))
			continue;
		if (isFunction(obj[i])) {
			obj[i] = angular.noop;
		} else {
			obj[i] = undefined;
		}
	}
}

function repaintFactory(el) {
	return function() {
		// now just find IE8 does not render after $digest, so change body's class, let do it.
		// IE9 radio also not render
		if (msie/* === 8*/) {
			repaint(el);
		}
	};
}

function repaint(el) {
	var clazz = 'angular-repaint-fix';
	el.addClass(clazz);
	window.setTimeout(function() {
		el.removeClass(clazz);
	}, 1);
}

function now() {
	return new Date().getTime();
}

function indexOf(array, obj) {
	  if (array.indexOf) return array.indexOf(obj);

	  for (var i = 0; i < array.length; i++) {
	    if (obj === array[i]) return i;
	  }
	  return -1;
}

function arrayRemove(array, value) {
	  var index = indexOf(array, value);
	  if (index >=0)
	    array.splice(index, 1);
	  return value;
}

////////////////////////////////
// $TargetsProvider
///////////////////////////////
function $TargetsProvider() {
	var targets = {}, transitions = {}, trackLine = {
		count : 0,
		history : -1,
		index : 0,
		tracks : []
	}, useLocation = false;

	var DEFAULT_TRANSITION = function(oldEl, newEl, remove, back) {
		if (newEl && newEl.length) {
			if (oldEl && oldEl.length) {
				oldEl.css('display', 'none');
				if (remove)
					oldEl.remove();
			}
			newEl.css('display', '');
		}
	};

	this.useLocation = function(yes) {
		useLocation = !!yes;
	};

	function transition(name, fn) {
		var old = transitions[name];
		if (!fn)
			return old || DEFAULT_TRANSITION;
		transitions[name] = fn;
		return old;
	}

	this.transition = transition;

	Factory.$inject = [ '$window', '$browser', '$log', '$rootScope' ];
	function Factory(window, $browser, $log, $rootScope) {
		var viewports = {};

		if (useLocation)
			$browser.useHistory();

		forward.clearTarget = function(target) {
			viewports[target] = undefined;
			targets[target] = undefined;
		};

		/*
		 * targets service, could be: 1. page fn(target, pageUrl[, active]) 2.
		 * viewport fn(target, url[, noHistory])
		 */
		function forward(target, urlExp, noHistory, data) {
			var view;
			if (angular.isObject(target) && target.$trackPage) {// is ViewportController
				view = target;
			} else if (angular.isString(target)) {
				view = viewports[target];
				if (!view)
					throw minErr('targets')('noviewport',
							"no viewport found: '{0}'", target);
			} else {
				throw minErr('targets')('targetid',
						"target must be viewportController or its id");
			}
			target = view.$id;
			var old = targets[target], url = urlExp;
			if (!url)
				return old;

			if (url.indexOf('#') === 0) {
				var page = url.substring(1);
				view.$trackPage(page, true);
				return;
			}

//			if (old && url === old.url)
//				return;

			if (noHistory === undefined)
				noHistory = view.$noHistory;

			var current = {
				target : target,
				url : url
			};

			trackLine.count++;

			$log.debug('targets forward to "' + url + '" in "' + target + '" '
					+ (!noHistory ? '[with track]' : '[without track]'));

			if (!noHistory) {
				addHistory(current);
			}

			toViewport(target, current, null, data);
		}

		function addHistory(current) {
			if (trackLine.index >= 0
					&& trackLine.index <= trackLine.tracks.length) {
				trackLine.tracks.splice(trackLine.index,
						trackLine.tracks.length - trackLine.index, current);
			} else {
				throw minErr('targets')('invalidindex',
						"invalid history index: '{0}'", trackLine.index);
			}
			trackLine.index++;
			if (useLocation) {
				var loc = "#/$" + trackLine.index;
				$browser.History.add({
					index : trackLine.index
				}, loc);
				trackLine.history = window.history.length;
			}
		}

		function toViewport(target, track, back, data) {
			targets[target] = track;
			viewports[target].$load(track, back, data);
		}

		function trackHistory(index) {
			var back = index < trackLine.index;
			trackLine.index = index;
			var cur = trackLine.tracks[index - 1];
			$log.debug('targets track to "' + cur.url + '" in "' + cur.target
					+ '"');
			toViewport(cur.target, cur, back);
		}

		if (useLocation) {
			$browser.onUrlChange(function(url) {
				var hash = $browser.hash();
				if (!hash || hash.indexOf('#/$') !== 0)
					return;
				var index = int(hash.substring(3));
				if (!isNumber(index) || index < 1)
					throw minErr('targets')('34',
							"invalid history index: '{0}'", index);
				if (index > trackLine.tracks.length)
					return;
				if (trackLine.index !== index) {
					trackHistory(index);
				}
			});
		}

		forward.track = function(steps) {
			var flag = steps.match(/^([\+\-]?)(\d+)$/);
			if (!flag)
				return;
			var n = int(steps);
			if (flag[1]) {// relative
				if (trackLine.tracks.length < 2)
					return;
				if (n <= -trackLine.index)
					n = -trackLine.index + 1;
				if (n > trackLine.tracks.length - trackLine.index)
					n = trackLine.tracks.length - trackLine.index;
				if (n === 0)
					return;
				if (useLocation) {
					$browser.History.go(n);
				} else {
					trackHistory(trackLine.index + n);
				}
			} else {
				if (n === 0) {
					// XXX n === 0 is special, it means reset history
					// history.count prevent reload dead loop
					if (trackLine.count > 1)
						return $browser.History.reload(-trackLine.index);
					return;
				}

				if (n > trackLine.tracks.length)
					throw minErr('targets')('35',
							"history over max index: '{0}'",
							trackLine.tracks.length);

				if (n === trackLine.index)
					return;
				if (useLocation) {
					$browser.History.go(n - trackLine.index);
				} else {
					trackHistory(n);
				}
			}
		};
		forward.track.info = trackLine;
		forward.transition = transition;

		forward.$viewports = viewports;

		return forward;
	}

	// return forward Factory
	this.$get = Factory;
}

var ngViewControllers = viewControllers();

function viewControllers() {
	var $httpBackend = null;

	function getTransition(scope, attrs, $targets, $animate) {
		var vAnimateAttr = attrs.vAnimate;
		if (vAnimateAttr) {
			//2014-2-14 yxf delete $animator, use $animate, no finish!   begin
			//var animate = $animator(scope, attrs);
			return function(newEl, oldEl, remove, back) {
				if (newEl && newEl.length) {
					if (oldEl && oldEl.length) {
						if (remove)
							animate.leave(oldEl, oldEl.parent(), null, back);
						else
							animate.hide(oldEl, oldEl.parent(), null, back);
					}
					animate.show(newEl, newEl.parent(), null, back);
				}
			};
			//2014-2-14 yxf end
		}
		return $targets.transition(attrs.vTransition);
	}


	ngViewportController.$inject = ['$scope', '$element', '$attrs', '$targets', '$http', '$templateCache', '$compile', '$log', '$httpBackend', '$animate'];
	function ngViewportController(scope, element, attr, $targets, $http, $templateCache, $compile, $log, httpBackend, $animate) {
		$httpBackend = httpBackend;

		/*jshint validthis:true*/
		var view = this, pages = {
			activePage : null,
			activeIndex : 0,
			activeMax : 0,
			track : []
		}, subviews = [];
		var vpId = attr.ngViewport || attr.id, transition = getTransition(scope, attr, $targets, $animate), noHistory = attr.history !== 'true', //
		onloadExp = attr.onload || '', onbeforeloadExp = attr.onbeforeload || '';

		if (!vpId)
			//throw vError(100, 'viewport must have id from "v-viewport" or "id" attribute');
			throw minErr('ngViewportController')('100', "viewport must have id from 'v-viewport' or 'id' attribute");

		var parentView = element.parent().controller('vViewport');
		var childScope = scope.$new();
		scope.$$viewport = vpId;

		view.$id = vpId;
		view.$noHistory = noHistory;
		var applied = attr.apply === 'true';
		var ajaxPort = attr.ajaxPort;

		if (applied) {
			scope.$$applied = scope;
			scope.$repaint = repaintFactory(element);
		}
		if (ajaxPort)
			scope.$$ajaxPort = ajaxPort;

		view.$activeElement = angular.element(wrapInner(element[0], element.contents()));
		$compile(view.$activeElement)(childScope);

		view.$pages = pages;
		view.$subviews = subviews;

		scope.$Remoting = scope.$Submitting = 0;
		view.$$remoteTouch = function(submit) {
			scope.$Remoting++;
			if (submit)
				scope.$Submitting++;
		};

		view.$init = function() {
			if (parentView)
				parentView.$subviews.push(this);
			if ($targets.$viewports[view.$id])
				//throw vError(101, 'duplicated viewport {0}', view.$id);
				throw minErr('ngViewportController')('101', "duplicated viewport '{0}'", view.$id);
			$targets.$viewports[view.$id] = view;
			var target = attr.href;
			if (target)
				$targets(view.$id, target, view.$noHistory);
		};

		view.$destroy = function() {
			if (!view.$$destroyed) {
				$targets.clearTarget(view.$id);
				if (parentView)
					arrayRemove(parentView.$subviews, view);
				view.$clearSubviews();
				view.$clearPages();
				view.$activeElement = null;
				view.$$destroyed = true;
				childScope.$destroy();
				scope.$destroy();
			}
		};

		view.$clearSubviews = function() {
			for (var i = 0; i < subviews.length; i++) {
				var v = subviews[i];
				v.$destroy();
			}
		};

		view.$clearPages = function() {
			for (var i = 0; i < pages.track.length; i++) {
				var p = pages.track[i];
				p.$destroy();
			}
			pages.activeIndex = 0;
			pages.activeMax = 0;
			pages.track = [];
			pages.activePage = null;
		};

		view.$addPage = function(page) {
			pages.track.push(page);
			page.$index = pages.track.length;
		};

		view.$removePage = function(page) {
			arrayRemove(pages.track, page);
		};

		view.$trackPage = function(id, active) {
			var page, match = id.match(/^([\+\-]?)(\d+)$/), index, back;
			if (!match)
				//throw vError(102, 'invalid page track, require [+-]number: {0}', id);
				throw minErr('ngViewportController')('102', "invalid page track, require [+-]number: '{0}'", id);
			index = int(id);
			if (match[1]) {// relative
				back = index < 0;
				if (pages.activeIndex < 1 || pages.track.length < 2)
					return;
				index = (pages.activeIndex + index - 1) % pages.track.length;
				if (index < 0)
					index += pages.track.length;
				index += 1;
				if (back && index > pages.activeIndex)
					index = 1;
				if (!back && index < pages.activeIndex)
					index = pages.track.length;
			} else {
				back = index < pages.activeIndex;
				if (index > pages.track.length)
					//throw vError(103, 'page over max index: {0}', pages.track.length);
					throw minErr('ngViewportController')('103', "page over max index: '{0}'", pages.track.length);
			}
			if (index === pages.activeIndex)
				return;
			if (!active && index > pages.activeMax)
				//throw vError(104, 'page over max index: {0}', pages.activeMax);
				throw minErr('ngViewportController')('104', "page over max index: '{0}'", pages.activeMax);

			if (index === 0) {
				//XXX n === 0 is special, it means reset viewport (now just activeMax reset)
				if (!view.$reload)
					return;
				$log.debug('reload viewport "' + vpId + '"');
				return view.$reload();
			} else {
				pages.activeIndex = index;
				if (active)
					pages.activeMax = match[1] ? index : Math.max(index, pages.activeMax);
			}

			if (active) {
				$log.debug('viewport forward to page#' + index + ' in "' + vpId + '"');
			} else {
				$log.debug('viewport track to page#' + index + ' in "' + vpId + '"');
			}

			page = pages.track[index - 1];
			page.$load(back);
		};

		view.$load = function(newtarget, back, data) {
			var src = newtarget.url;
			if (onbeforeloadExp)
				src = scope.$eval(onbeforeloadExp) || newtarget.url;
			if (src) {
				view.$rootUrl = src;
				var base = getBase(src);
				view.$reload = function(back) {
					$http.get(src, {
						cache : $templateCache,
						$scope : scope
					}).success(function(response) {
						setInnerHTML(scope, element[0], response, function(newElement) {
							var oldEl = view.$activeElement;
							var el = view.$activeElement = angular.element(newElement);

							view.$clearPages();
							view.$clearSubviews();

							if (childScope)
								childScope.$destroy();

							childScope = scope.$new();
							//2014-3-10 yxf add pre.do begin
							angular.forEach(data, function(v, k){
								childScope[k] = v;
							});
							//2014-3-10 yxf add pre.do end
							$compile(el)(childScope);

							transition(oldEl, el, true, back);

							childScope.$root.$broadcast('$viewportContentLoaded', vpId, src);
							scope.$eval(onloadExp);
							//scope.$eval(onloadExp, injectRemote(element, null, onloadExp, false, $$remote));

							if (pages.track.length)
								view.$trackPage('1', true);

						}, base, false);
					}).error(function(reason, code, headers, config) {
						//throw vError(105, 'http error [{0}] - {1}: {2}', code, reason, config.url);
						throw minErr('ngViewportController')('105', "http error [{0}] - {1}: {2}", code, reason, config.url);
					});
				};
				view.$reload(back);
			} else {
				//throw vError(106, 'target url is null');
				throw minErr('ngViewportController')('106', "target url is null");
			}
		};

	}


	ngPageController.$inject = ['$scope', '$element', '$attrs', '$http', '$templateCache', '$targets', '$compile', '$browser', '$httpBackend', '$animate'];
	function ngPageController(scope, element, attr, $http, $templateCache, $targets, $compile, $browser, httpBackend, $animate) {
		$httpBackend = httpBackend;

		/*jshint validthis:true*/
		var page = this, viewport = element.parent().controller('ngViewport');
		var transition = getTransition(scope, attr, $targets, $animate), onloadExp = attr.onload, target = attr.href;
		var forms = [];

		if (!viewport)
			//throw vError(107, 'ng-page must inside ng-viewport');
			throw minErr('ngPageController')('107', "ng-page must inside ng-viewport");

		element[0].style.display = 'none';
		if (!target)
			page.$$loaded = 'loaded';

		page.$element = element;

		page.$destroy = function() {
			page.$element = null;
			forms = [];
			viewport.$removePage(page);
		};

		page.$addForm = function(form) {
			forms.push(form);
		};

		page.$removeForm = function(form) {
			arrayRemove(forms, form);
		};

		page.$bind = function() {
			angular.forEach(forms, function(f) {
				f.$bind();
			});
		};

		page.$unbind = function() {
			angular.forEach(forms, function(f) {
				f.$unbind();
			});
		};

		page.$load = function(back) {
			if (target && !page.$$loaded) {
				var base = getBase(target);
				$http.get(target, {
					cache : $templateCache,
					$scope : scope
				}).success(function(response) {
					setInnerHTML(scope, element[0], response, function() {
						page.$$loaded = 'loaded';
						loadPage(page, back);
					}, base, true);
				}).error(function(reason, code, headers, config) {
					//throw vError(108, 'http error [{0}] - {1}: {2}', code, reason, config.url);
					throw minErr('ngPageController')('108', "http error [{0}] - {1}: {2}", code, reason, config.url);
				});
			} else {
				$browser.defer(function() {
					loadPage(page, back);
//					scope.$apply(null, 'v-page');
					scope.$apply(null);
				});
			}
		};

		/*
		 function loadPage(page, back) {
		 var el = clonePageElement(element);
		 element.after(el);
		 $compile(el.contents())(scope, null, false);
		 scope.$root.$broadcast('$pageContentLoaded', viewport.$id, page.$index, target);
		 scope.$eval(onloadExp);
		 transition(viewport.$pages.activePage.$element, el, true, back);
		 viewport.$pages.activePage = page;
		 }

		 function clonePageElement(el) {
		 var clone = jqLite(el[0].cloneNode(false)), children = el[0].childNodes;
		 for (var i = 0; i < children.length; i++) {
		 if (_nodeName(children[i]) !== 'SCRIPT')
		 clone.append(children[i].cloneNode(true));
		 }
		 return clone;
		 }
		 */

		function loadPage(page, back) {
			var el = element, lastPage = viewport.$pages.activePage;
			//XXX only compile once, otherwise memory-leak due to scope not $destroy
			if (lastPage)
				lastPage.$unbind();
			if (page.$$loaded !== 'compiled') {
				$compile(el.contents())(scope, null, false);
				page.$$loaded = 'compiled';
			} else {
				page.$bind();
			}

			scope.$root.$broadcast('$pageContentLoaded', viewport.$id, page.$index, target);
			scope.$eval(onloadExp);
			//scope.$eval(onloadExp, injectRemote(el, null, onloadExp, false, $$remote));
			transition(lastPage && lastPage.$element, el, false, back);
			viewport.$pages.activePage = page;
		}

	}

	return {
		viewport : ngViewportController,
		page : ngPageController
	};

	// -------------------- inner function ----------------------------
	function wrapInner(parent, children) {
		var div = document.createElement('div');
		div.className = 'viewport-wrapper';
		parent.appendChild(div);
		if (children) {
			for (var i = 0, ii = children.length; i < ii; i++) {
				div.appendChild(children[i]);
			}
		}
		return div;
	}

	// append HTML (include script)
	function setInnerHTML(scope, el, htmlCode, done, root, isPage) {
		el = isPage ? el : wrapInner(el);
		el.style.display = 'none';
		parseElements(htmlCode, el, scope, done, root);
	}

	function getBase(path) {
		var p = path && path.lastIndexOf('/');
		if (!p)
			return "";
		return path.substring(0, p + 1);
	}

	function getPath(src, root) {
		if (src.charAt(0) === '/')
			return src;
		return root + src;
	}

	function createElements(htmlCode) {
		//*** jimmy, for IE innerHTML will load script by src, so replace 'src=' to 'ng-src='
		htmlCode = htmlCode.replace(/<script([^>]*)(src\s*=)([^>]*)>/gi, "<script$1ng-src=$3>");
		var div = document.createElement('div');
		if (msie) {
			htmlCode = '<div style="display:none">for IE</div>' + htmlCode;
			div.innerHTML = htmlCode;
			div.removeChild(div.firstChild);
		} else {
			div.innerHTML = htmlCode;
		}
		var array = [], fc = div.firstChild;
		while (fc) {
			div.removeChild(fc);
			array.push(fc);
			fc = div.firstChild;
		}
//		if (msie)
//			IE_GC(div);
		return array;
	}

	function parseElements(htmlCode, el, scope, done, root) {
//		var port = scope.$$ajaxPort;
		var nodes = createElements(htmlCode), node, remoteCount = 0, remoteSize = 0, i, ii;
		for ( i = 0, ii = nodes.length; i < ii; i++) {
			node = nodes[i];
			if (node.nodeName === 'SCRIPT' && node.getAttribute('ng-src'))
				remoteSize++;
		}
		for ( i = 0; i < nodes.length; i++) {
			node = nodes[i];
			if (node.nodeName === 'SCRIPT') {
				if (node.getAttribute('ng-src'))
					remote(node);
				else
					local(node);
//				if (msie)
//					IE_GC(node);
			} else {
				el.appendChild(node);
			}
		}

		if (remoteSize === 0 && done)
			done(el);

		function local(node) {
			var script = document.createElement('script');
			script.type = node.type || 'text/javascript';
			// for template
			if (node.id)
				script.id = node.id;
			// for IE cannot use 'innerHTML', just use 'text'
			script.text = node.text;
			el.appendChild(script);
		}

		// for script signature is httpBackend(node, url, type, callback, ajaxPort)
		function remote(node) {
			var url = getPath(node.getAttribute('ng-src'), root), type = node.type || 'text/javascript';
			var doneWrapper = function(status, response, headers) {
				remoteCount++;
				if (done && remoteCount === remoteSize)
//					scope.$apply(function() {
//						done(el);
//					}, 'script->' + url);
					scope.$apply(function() {
						done(el);
					});
			};
//			$httpBackend(el, url, type, doneWrapper, port);
			$httpBackend(el, url, type, doneWrapper);
		}

	}

}

// add form nested viewport process
ngViewportDirective.$inject = ['$targets'];
function ngViewportDirective($targets) {
	return {
		restrict : 'EA',
		scope : true,
		terminal : true,
		priority : 99,
		controller : ngViewControllers.viewport,
		link : function(scope, element, attr, ctrl) {
			ctrl.$init();
			element.bind('$destroy', function() {
				ctrl.$destroy();
				cleanupClosure(ctrl);
			});
		}
	};
}

function ngPageDirective() {
	return {
		restrict : 'EA',
		terminal : true, // disable page inner compile for lazy-compile
		require : ['ngPage', '^ngViewport'],
		priority : 99,
		controller : ngViewControllers.page,
		link : function(scope, element, attr, ctrl) {
			ctrl[1].$addPage(ctrl[0]);
			element.bind('$destroy', function() {
				ctrl[0].$destroy();
				cleanupClosure(ctrl[0]);
			});
		}
	};
}

function ngDateDirective() {
	return {
		restrict : 'CA',
		link : function(scope, element, attrs, ctrls) {
			element.css({
				"width" : "85px",
				"border" : "1px solid #C0C0C0",
				"margin" : "0 2px 0 2px"
			});
//			if (attrs.type == 0) {
//				element.attr("readonly", "readonly");
//			}
//			if (element.attr('readonly') == 'true' || element.attr('readonly') == 'readonly') {
//				element.bind('keydown', function(event) {
//					if (event.keyCode == 8) {
//						if (vx.isFunction(event.preventDefault)) {
//							event.preventDefault();
//						} else {
//							event.returnValue = false;
//						}
//					}
//				});
//			} else {
//			}
			var dateFormat = {
				value : 'yy-mm-dd'
			}
			angular.extend(dateFormat, {
				value : attrs.dateformat
			});
			var minDate = {
				value : ''
			}
			angular.extend(minDate, {
				value : attrs.mindate
			});
			var maxDate = {
				value : ''
			}
			angular.extend(maxDate, {
				value : attrs.maxdate
			});
			element.datepicker({
				dateFormat : dateFormat.value,
				maxDate : maxDate.value,
				minDate : minDate.value,
				onSelect : function(data, ints) {
					scope.$eval(attrs.ngModel + '=' + '"' + data + '"');
				}
			});
		}
	};
}

ngPlaceholderDirective.$inject=['$interpolate'];
function ngPlaceholderDirective($interpolate){
		return {
			restrict : 'A',
			scope:false,//
			template:'',
			link:function($scope,element,attr){
				var prop=element.attr('ng-placeholder'),init=attr.ngPlaceholder;
				//ngPlaceholderMinErr = minErr("ngPlaceholder")
				//if(!init) throw ngPlaceholderMinErr("nulldata","the value of ng-placeholder is null!");
				if($scope.hasOwnProperty(init)){//property
					cnt=$scope.$eval(init);
				}else{
					cnt=init;//const data
				}
				//return;
				element.wrap("<div style='position:relative'></div>");
				element.parent().append("<span style='color:#999999;padding-left: 5px;position:absolute;top:0px;left:0px;right:0px;bottom:0px;line-height:1.5em;box-sizing:content-box;' class='ng-placeholder-span'></span>");
				var span=element.next();
				span.css("fontSize",element.css("fontSize"));
				span.text(cnt);
				span.click(function(){
					element.focus();
				});
				element.keyup(function(e){
					element.val()?span.hide():span.show();
				});
				(cnt!=init)&&$scope.$watch(function(){
					return $scope.$eval(init);
				},function(n,o){
					span.text(n);
				});
				prop.indexOf($interpolate.startSymbol())>-1&&prop.indexOf($interpolate.endSymbol())>-1&&$scope.$watch(function(){
					return $interpolate(prop)($scope);
				},function(n,o){
					span.text(n);
				});
			}
		}
	};

function FileUpLoadHelper($rootScope){
	var success,error;
		this.setSuccessHandler=function(fn){
			success=fn;
		}
		this.setErrorHandler=function(fn){
			error=fn;
		}
		this.doUpload=function(uri,postData, path){
			this._options._upload(uri,postData, path);
		}
	this._options={
		_upload:function(uris,postData, path){
			var uri;
			if(angular.isString(uris)){
				uri=uris;
			}
			var idArray = postData.idArray;
			var self = this;
			var toElement = (function() {
						var div = document.createElement('div');
						return function(html) {
						div.innerHTML = html;
						var element = div.firstChild;
						div.removeChild(element);
						return element;
						};
					})();
				var iframes=document.getElementsByName('upload');
				var iframe =iframes.length==0?toElement('<iframe src="javascript:void(0);" name="upload" ></iframe>'):iframes[0];
				iframe.style.display = 'none';
				document.body.appendChild(iframe);
				var form = toElement('<form method="post" enctype="multipart/form-data"></form>');
				form.setAttribute('action', uri);
				form.setAttribute('target', iframe.name);
				form.style.display = 'none';
				document.body.appendChild(form);
				for(var key in idArray) {
					var o = document.getElementById(idArray[key]);
					if(o!=null&&o.value!=null&&o.value!=''){
						if(angular.isObject(uris)){
							uri=this._checkFileType(o.value,uris);
							if(uri){
								form.setAttribute('action', uri);
							}else{
								return false;
							}
						}
						this._addInput(o);
						form.appendChild(document.getElementById(idArray[key]));
					}
				};
				if(postData!=null){
					this._addParameters(form,postData);
				}
				this._attachLoadEvent(iframe, function() {
					var response = self._getIframeContentJSON(iframe);
					setTimeout(function() {
						angular.element(iframe).remove();
					}, 1);
					self._onComplete(response, path);
				});
				form.submit();
				angular.element(form).remove();
		},
		_addInput:function(o){
			if(o!=null){
				var parent = o.parentNode;
				var input = document.createElement('input');
				input.setAttribute('id', o.id);
				input.setAttribute('name', o.name);
				input.setAttribute('type','file');
				parent.appendChild(input);
			}
		},
		_addParameters:function(form,postData){
			for(var key in postData){
				if(key!=null&&key!='idArray'&&postData[key]!=null){
					var input = document.createElement('input');
					input.setAttribute('name', key);
					input.setAttribute('value',postData[key]);
					form.appendChild(input);
				}
			}
		},
		_checkFileType:function(fileName,uris){
			var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';
			if(uris[ext]!=null){
				return uris[ext];
			}else{
				this._error("上传文件类型错误",fileName);
				return false;
			}
		},
		_attachLoadEvent : function(iframe, callback) {
			angular.element(iframe).bind('load', function(event) {
				if(!iframe.parentNode) {
					return;
				}
				if(iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.innerHTML == "false") {
					return;
				}
				callback();
			});
		},
		_getIframeContentJSON : function(iframe) {
			var doc, response, innerhtml, fomatJson;
			if(iframe.contentDocument) {
				doc = iframe.contentDocument;
			}
			try {
				if(iframe.contentWindow.document) {
					doc = iframe.contentWindow.document;
				}
			} catch(e) {
				if(iframe.document) {
					doc = iframe.document
				}
			}
			innerhtml = doc.body.innerHTML;
			var firstTag = innerhtml.indexOf('{'), lastTag = innerhtml.lastIndexOf('}');
			if(firstTag == -1 || lastTag == -1) { 
				firstTag = innerhtml.indexOf('>'), lastTag = innerhtml.lastIndexOf('<');
				try {
					response = angular.fromJson(innerhtml.substr(firstTag + 1, lastTag - firstTag - 1));
				} catch(err) {
					response = {};
				}
			} else {
				innerhtml = innerhtml.substr(firstTag, lastTag - firstTag + 1);
				try {
					fomatJson = innerhtml.substring(innerhtml.indexOf('{'), innerhtml.lastIndexOf('}') + 1);
					response = angular.fromJson(fomatJson);
				} catch(err) {
					response = {};
				}
			}
			return response;
		},
		_validateFile : function(file) {
			var name;
			if(file.value) {
				name = file.value.replace(/.*(\/|\\)/, "");
			} else {
				name = file.fileName != null ? file.fileName : file.name;
			}
			if(!this._isAllowedExtension(name)) {
				this._error('typeError', name);
				return false;
			} else if(this._options.limit && this._options.limit <= this._handler._files.length) {
				this._error('limitError', name);
				return false;
			} else if(this._handler.getFileIdxByName(name)>=0){
				this._error('uniqueError', name);
				return false;
			}
			return true;
		},
		_error : function(code, fileName) {
			error(code+': '+fileName);
		},
		_isAllowedExtension : function(fileName) {
			var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';
			this._handler._options.actionType = ext;
			var allowed = this._options.allowedExtensions;
			if(!allowed.length) {
				return true;
			}
			for(var i = 0; i < allowed.length; i++) {
				if(allowed[i].toLowerCase() == ext) {
					return true;
				}
			}
			return false;
		},
		_onComplete : function(result, path) {
			if(result.ErrorCode || result.ErrorMessage) {
				error(result);
			} else {
				success(result,path);
			}
		}
	}
}

function $fileuploaderProvider(){
	this.$get = ['$http', '$rootScope','$targets','$timeout',
	function($http, $rootScope,$targets,$timeout) {
		return function(uri,postData,path,success,error){
			function successhandler(u,path){
				
				if(angular.isFunction(success)){
					success(u);
				}
				if(path!=null && path.length > 0) {
					$rootScope.goTo(path);
				}
			}
			
			var uploadhelper = new FileUpLoadHelper($rootScope);
			uploadhelper.setSuccessHandler(successhandler);
			
			if(!angular.isFunction(error)){
				error=$rootScope.error;
			}
			uploadhelper.setErrorHandler(error);
			uploadhelper.doUpload(uri,postData, path);
		}
	}];
}

function $printProvider(){
	this.$get = ['$http', '$rootScope', function(){
		return function print(html){
			var toElement = (function() {
						var div = document.createElement('div');
						return function(html) {
						div.innerHTML = html;
						var element = div.firstChild;
						div.removeChild(element);
						return element;
						};
					})();
			var iframe;
			iframe=toElement('<iframe src="javascript:false;" name="printFrame" id="printFrame"></iframe>');
			iframe.style.display = 'none';
			window.document.body.appendChild(iframe);
			var st=[];
			st.push('<head>\
					<meta charset="utf-8" />\
					<link href="css/index.css" rel="stylesheet"\
						type="text/css" />\
					<link href="css/css.css?_=1.0" media="all"\
						rel="stylesheet" type="text/css" />\
					<link href="css/jquery-ui-1.8.17.custom.css?_=1.0" media="all"\
						rel="stylesheet" type="text/css" />\
					</head>\
					');
			st.push('<body>');
			st.push(html);
			st.push('</body>');
			//判断浏览器
			if(msie){
				if(msie <= 8){
					iframe.contentWindow.document.open();
					iframe.contentWindow.document.write(st);//解决打印翻页左上角空白问题
					iframe.contentWindow.document.close();
					iframe.contentWindow.document.execCommand('Print');
				}else{
					iframe.contentDocument.open();
					iframe.contentDocument.write(st);//解决打印翻页左上角空白问题
					iframe.contentDocument.close();
					iframe.contentDocument.execCommand('Print');
				}
			}else{
				iframe.contentDocument.open();
				iframe.contentDocument.write(st);//解决打印翻页左上角空白问题
				iframe.contentDocument.close();
				frames['printFrame'].print();
			}
		};
	}];
}

function $filedownloaderProvider(){
	this.$get = ['$http','$rootScope',function($http, $rootScope){
			return function filedownload(uri,postdata){
				var toElement = (function() {
					var div = document.createElement('div');
					return function(html) {
					div.innerHTML = html;
					var element = div.firstChild;
					div.removeChild(element);
					return element;
					};
				})();
				var iframes=document.getElementsByName('download');
				var iframe =iframes.length==0?toElement('<iframe src="javascript:false;" name="download" />'):iframes[0];
				iframe.style.display = 'none';
				document.body.appendChild(iframe);
				var form = toElement('<form method="post" enctype="application/x-www-form-urlencoded;charset=UTF-8"></form>');
				form.setAttribute('action', uri);
				form.setAttribute('target', iframe.name);
				form.style.display = 'none';
				document.body.appendChild(form);
				for(var key in postdata) {
					var input = document.createElement('input');
					input.setAttribute('name', key);
					input.setAttribute('value', encodeURIComponent(postdata[key]));
					form.appendChild(input);
				};
				var _getIframeContentJSON = function(iframe){
					var doc, response, innerhtml, fomatJson;
					if(iframe.contentDocument) {
						doc = iframe.contentDocument;
					}
					try {
						if(iframe.contentWindow.document) {
							doc = iframe.contentWindow.document;
						}
					} catch(e) {
						if(iframe.document) {
							doc = iframe.document
						}
					}
					innerhtml = doc.body.innerHTML;
					var firstTag = innerhtml.indexOf('{'), lastTag = innerhtml.lastIndexOf('}');
					if(firstTag == -1 || lastTag == -1) { 
						firstTag = innerhtml.indexOf('>'), lastTag = innerhtml.lastIndexOf('<');
						try {
							response = angular.fromJson(innerhtml.substr(firstTag + 1, lastTag - firstTag - 1));
						} catch(err) {
							response = {};
						}
					} else {
						innerhtml = innerhtml.substr(firstTag, lastTag - firstTag + 1);
						try {
							fomatJson = innerhtml.substring(innerhtml.indexOf('{'), innerhtml.lastIndexOf('}') + 1);
							response = angular.fromJson(fomatJson);
						} catch(err) {
							response = {};
						}
					}
					return response;
				};
				angular.element(iframe).bind('load', function(event) {
					if(!iframe.parentNode) {
						return;
					}
					if(iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.innerHTML == "false") {
						return;
					}
					var response = _getIframeContentJSON(iframe);
					setTimeout(function() {
						angular.element(iframe).remove();
					}, 5000);
					var result = response;
				    if(result.ErrorCode || result.ErrorMessage) {
				    	$rootScope.error(result);
				    } else {
				    }
				});
				form.submit();
				angular.element(form).remove();
			};
	}];
}

function $httpExtProvider() {
	this.$get = ['$http', '$rootScope', '$targets', '$timeout',
	     		function($http, $rootScope, $targets, $timeout) {
	     			return function httpExt(uri, postdata, path, success, error, scope) {
	     				if(angular.element("#errorMessage") != null){
	     					angular.element("#errorMessage").hide();
	     				}
	     				
	     				if(error == null || !angular.isFunction(error)){
	     					error = $rootScope.error;
	     				}
     					var timeout = 60000;
     					if (postdata && postdata._timeout) {
     						timeout = postdata._timeout;
     					}
     					$http({method: 'POST', url: uri, data: postdata || {}, timeout: timeout, $scope: scope}).success(function(u) {
     						if(u == 'timeout'){ 
     							error(u);
     							return;
     						}
     						if(u.ErrorCode || u.ErrorMessage) {
     							error(u);
     						}else {
     							success(u);
     							if(path && path.length > 0)
         							$targets('transView', path);
     						}
     					}).error(function(u, h) {
     						error(u);
     					});
	     			};
	     		}];
}

angular.module('angular-ext').provider({
	$targets : $TargetsProvider,
	$fileuploader : $fileuploaderProvider,
	$filedownloader : $filedownloaderProvider,
	$print : $printProvider,
	$httpExt : $httpExtProvider
}).directive({
	ngViewport : ngViewportDirective,
	ngPage : ngPageDirective,
	ngDate : ngDateDirective,
	ngPlaceholder:ngPlaceholderDirective
});