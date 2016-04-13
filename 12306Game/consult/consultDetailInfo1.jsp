<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" %>

<html>
<head>
<title>非京车友汇</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no" />
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<script src="../js/jquery.js"></script>
<script src="../js/jquery.mobile-1.4.5.js"></script>
<script type="text/javascript" src="../js/WeixinApi.js?v=1"></script>
<link rel="stylesheet" type="text/css" href="../css/themes/default/jquery.mobile-1.4.5.min1212.css" />
<link rel="stylesheet" href="../css/jqm-demos.css">
<style>
h3 {
line-height: 18px;
padding-left: 11px;
padding-top:1px;
font-weight: bold;
color: #1a1a1a;
font-size: 18px;
height: 26px;
}
.blue{
color:blue;
}
</style>
<script>
function forward(type)
{
	switch(type){
		case 1:
			window.location.href="../netInfo.jsp?type=1";
			break;
		case 0:
			window.location.href="consultInfo.jsp";
			break;
		case 2:
			window.location.href="../netInfo.jsp?type=2";
			break;
	}
}
</script>
</head>
<body>

<div data-role="page" id="pageIndex" data-position="fixed" >
	<h3>什么是进京证？</h3>
		<div data-role="content" role="main" data-inset="false">
		
			<div data-role="collapsible-set" data-theme="d"
				data-content-theme="b" data-inset="false">
				<ul data-role="listview" data-inset="false" data-icon="home">
				 	
					<li data-role="list-divider">定义
						<a style="text-decoration:none;float: right;" href="javascript:forward(0)"  data-transition="flip" >返回</a>
					</li>
					<li>
						<p style="white-space:normal;font-size:18px">
						进京证是指针对<span class="blue">外埠机动车辆</span>进入北京市<span class="blue">六环以内</span>必须持有的临时有效证件。</p>
						<p style="white-space:normal;font-size:16px">有效期为7天。[到期前一天，到期当天及到期后一天]可以到当地交警支队办理延期5天。12天过后若仍需用进京证只能去进京的综合检查站重新办理7天的证件。</p>
					</li>
					
					<li data-role="list-divider">办理地点</li>
					<li>
						<p style="white-space:normal;font-size:16px">
							办理地点：24个检查站/者办证处<a href="javascript:forward(1)">查看</a>
						</p>
						<p style="white-space:normal;font-size:16px">
							延期地点：市9个交警支队<a href="javascript:forward(2)">查看</a></p>
						<p style="white-space:normal;font-size:16px">
							办理时间：全天24小时
						</p>
					</li>
					
					<li data-role="list-divider">注意事项</li>
					<li>
						<p style="white-space:normal;font-size:16px">
							早晚高峰五环内（含）禁行
						</p>
					</li>
				</ul>
			</div>
			
		</div>
</div>
</body>
</html>
