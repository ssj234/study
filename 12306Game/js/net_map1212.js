var map;
	var add_addr;
	var can_click = true;
	var user_loc;//鐢ㄦ埛鐨勪綅缃�
	var add_div_flag = false;//鏄惁澶勪簬娣诲姞鐘舵�
	var mySquare;//鍞竴鐨勬坊鍔犵墿
	var marker;//娣诲姞鐐�
	var point_g;
	 var transit;
	// 瀹氫箟鑷畾涔夎鐩栫墿鐨勬瀯閫犲嚱鏁� 
	function AddTooltip(point) {
		this._point = point;
	}
	function ZoomControl() {
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;// 璁剧疆榛樿鍋滈潬浣嶇疆鍜屽亸绉婚噺      
		this.defaultOffset = new BMap.Size(20, 30);
	}
	function initMap() {
		if(map)return;
		map = new BMap.Map("l-map");
		//map.centerAndZoom(new BMap.Point(pointX, pointY), 14); //璁剧疆涓績
		
		//娣诲姞姣斾緥灏烘帶浠�
		var scaleControl = new BMap.NavigationControl({
			"anchor" : BMAP_ANCHOR_TOP_RIGHT
		});
		map.addControl(scaleControl);
		map.enableDragging();
		
		var point = new BMap.Point(pointX, pointY);
		point_g=point;
		var marker = new BMap.Marker(point);  // 鍒涘缓鏍囨敞
		map.addOverlay(marker);
		map.centerAndZoom(point, 15);
		
		//娣诲姞瀹氫綅鎺т欢
		var geolocationControl = new BMap.GeolocationControl();
		map.addControl(geolocationControl);

		/*******************************瀹氫箟涓�釜鍙充笅鏂圭殑add********************/
		
		// 閫氳繃JavaScript鐨刾rototype灞炴�缁ф壙浜嶣Map.Control     
		ZoomControl.prototype = new BMap.Control();

		// 鑷畾涔夋帶浠跺繀椤诲疄鐜癷nitialize鏂规硶锛屽苟涓斿皢鎺т欢鐨凞OM鍏冪礌杩斿洖     
		// 鍦ㄦ湰鏂规硶涓垱寤轰釜div鍏冪礌浣滀负鎺т欢鐨勫鍣紝骞跺皢鍏舵坊鍔犲埌鍦板浘瀹瑰櫒涓�    
		ZoomControl.prototype.initialize = function(map) {
			return;
			//鍒涘缓涓�釜DOM鍏冪礌     
			var div = document.getElementById("add_div2");
			// 娣诲姞DOM鍏冪礌鍒板湴鍥句腑     
			map.getContainer().appendChild(div);
			return div;
		}

		// 鍒涘缓鎺т欢瀹炰緥      
		var myZoomCtrl = new ZoomControl(BMAP_ANCHOR_TOP_LEFT);
		// 娣诲姞鍒板湴鍥惧綋涓�     
		map.addControl(myZoomCtrl);
		

		/****************************瑕嗙洊鐗�*******************************/
		// 缁ф壙API鐨凚Map.Overlay    
		AddTooltip.prototype = new BMap.Overlay();
		// 瀹炵幇鍒濆鍖栨柟娉� 
		AddTooltip.prototype.initialize = function(map) {
			// 淇濆瓨map瀵硅薄瀹炰緥   
			this._map = map;
			// 鍒涘缓div鍏冪礌锛屼綔涓鸿嚜瀹氫箟瑕嗙洊鐗╃殑瀹瑰櫒   
			var div = document.getElementById("tooltip_div");
			div.style.position = "absolute";
			// 灏哾iv娣诲姞鍒拌鐩栫墿瀹瑰櫒涓�  
			map.getPanes().markerPane.appendChild(div);
			// 淇濆瓨div瀹炰緥   
			this._div = div;
			// 闇�灏哾iv鍏冪礌浣滀负鏂规硶鐨勮繑鍥炲�锛屽綋璋冪敤璇ヨ鐩栫墿鐨剆how銆�  
			// hide鏂规硶锛屾垨鑰呭瑕嗙洊鐗╄繘琛岀Щ闄ゆ椂锛孉PI閮藉皢鎿嶄綔姝ゅ厓绱犮�   
			return div;
		}

		// 瀹炵幇缁樺埗鏂规硶   
		AddTooltip.prototype.draw = function() {
			// 鏍规嵁鍦扮悊鍧愭爣杞崲涓哄儚绱犲潗鏍囷紝骞惰缃粰瀹瑰櫒    
			var position = this._map.pointToOverlayPixel(this._point);
			this._div.style.left = position.x + "px";
			this._div.style.top = position.y + "px";
		}
		// 瀹炵幇鏄剧ず鏂规硶    
		AddTooltip.prototype.show = function() {
			if (this._div) {
				this._div.style.display = "";
			}
		}
		// 瀹炵幇闅愯棌鏂规硶  
		AddTooltip.prototype.hide = function() {
			if (this._div) {
				this._div.style.display = "none";
			}
		}
		
		/******************MAP娣诲姞鐐瑰嚮浜嬩欢*******************/
		/*map.addEventListener("click", function(e) {
			click_e = e;
			
		});*/
		/*************************************/
		
		clickAddControl();
		
		addActivity();
		
		$j("#add_div2").click(function() {
			
		});
		setTimeout(hideCpy,1000);
		//$j("#add_div").show();
		 
	}
	function hideCpy()
	{
		$j(".BMap_cpyCtrl").hide();
		map.centerAndZoom(point_g, 14);
	}
	function clickAddControl() {
		$j(".BMap_cpyCtrl").hide();
		if (!$j("#add_div2").is(":animated")) { //鍒ゆ柇鍏冪礌鏄惁姝ｅ浜庡姩鐢荤姸鎬�
			//濡傛灉褰撳墠娌℃湁杩涜鍔ㄧ敾锛屽垯娣诲姞鏂板姩鐢�
				$j("#add_div2").animate({
					width : '132px'
				});
				
				add_div_flag = true;
				can_click = true;
		}
	}
	/************************************************************/
	
	function addActivity() {
		/*if(!e)return;
		if (!marker) {
			marker = new BMap.Marker(e.point); // 鍒涘缓鏍囨敞    
			map.addOverlay(marker);
		} else {
			marker.setPosition(e.point);
		}
		marker.show();*/
		
		add_addr = pointTitle||'initialize';
		$j("#tooltip_div_2").text(add_addr);
		$j("#tooltip_div_2").width((add_addr.length * 12) + "px");
		$j("#tooltip_div").width((64 + add_addr.length * 12) + "px");

		// 娣诲姞鑷畾涔夎鐩栫墿   
		if (!mySquare) {
			mySquare = new AddTooltip(point_g);
			map.addOverlay(mySquare);
		} else {
			mySquare._point = point_g;
			mySquare.draw();
		}
		mySquare.show();
		
	}
	
	function getUserLoc() {
		if (!user_loc) {
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r) {
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
					//alert('鎮ㄧ殑浣嶇疆锛�+r.point.lng+','+r.point.lat);
					user_loc = r.point;
				} else {
					alert('鑾峰彇浣嶇疆澶辫触' + this.getStatus());
					user_loc = undefined;
					
				}
			}, {
				enableHighAccuracy : true
			})
			
		}
		return user_loc;
		
	}