<%@ page isErrorPage="true" %>
<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<%@page import="com.kony.web.exception.ChannelNotFoundException" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 <title>Error Page</title>
</head>
<body id="errorx" class="">
<%
if(exception instanceof ChannelNotFoundException)
 {%>
	This device is currently not supported
<% } else { %>
 	Unknown Error Occurred <br/> Contact System Admin
<% } %>
</body>
</html>