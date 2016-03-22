<%@page contentType='text/html;charset=gb2312'%>

<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%
String rs=(String)request.getParameter("rs");
application.setAttribute("rs",rs);
System.out.print(rs);
%>
