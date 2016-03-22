<%
	String name=request.getParameter("name");
	String age=request.getParameter("age");
	name+="_json";
	age+="_json";
%>
{"name":"<%=name%>","age":"<%=age%>"}