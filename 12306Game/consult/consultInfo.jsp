<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" %>

<html>
<head>
<title>非京车友汇</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no" />
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<script src="../js/jquery.js"></script>
<script src="../js/jquery.mobile-1.4.5.js"></script>
<script type="text/javascript" src="js/WeixinApi.js?v=1"></script>
<link rel="stylesheet" type="text/css" href="../css/themes/default/jquery.mobile-1.4.5.min1212.css" />
<script>
    function gotoFun(type)
	{
		if(type==1)
		{
			location.href="consultDetailInfo1.jsp";return;	
		}else if(type==2)
		{
			location.href="consultDetailInfo2.jsp";	
		}else if(type==3)
		{
			location.href="consultDetailInfo3.jsp";	
		}else if(type==4)
		{
			//location.href="userInfo.jsp";return;	
		}else if(type==5)
		{
			//location.href="netInfo.jsp";return;	
		}else if(type==6)
		{
			//location.href="consultInfo.jsp";return;	
		}
	}
</script>
</head>
<body>

<div data-role="page" id="pageone">
  <div data-role="content">
    <ul data-role="listview" data-inset="false" >
      
      <li>
        <a href="#" onclick="javascript:gotoFun(1);" >
        <!--<img src="images/begin.png">-->
        <h2>什么是进京证？</h2>
        <p>进京证定义，办理地点</p>
        </a>
      </li>
      <li>
        <a href="#" onclick="javascript:gotoFun(2);" ><!--
        <img src="images/search.png">
        --><h2>办理进京证需要什么材料？</h2>
        <p>所需提供材料详细说明</p>
        </a>
      </li>
      <li>
        <a href="#" onclick="javascript:gotoFun(3);">
        <!--<img src="images/myact.png">
        --><h2>怎么办理进京证？</h2>
        <p>办理进京证的详细流程</p>
        </a>
      </li>
    </ul>
  </div>
</div> 
</body>
</html>
