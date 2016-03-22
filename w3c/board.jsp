<%@page contentType='text/html;charset=gb2312'%>

<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%
	String rs=(String)application.getAttribute("rs");
%>
<html>
<textarea id="rs" rows="50" cols="300"></textarea>
<script type="text/javascript" src="global/js/jquery.js"></script>
<script type="text/javascript">
	
	$("#rs").bind("blur",function(){
		var tmp=$("#rs").val();
		$.post("save.jsp",{rs:tmp},function(){

		},"json");
	});
	$("#rs").val('<%=rs%>');
</script>
</html> 
