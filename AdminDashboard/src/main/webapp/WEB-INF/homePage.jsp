<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Welcome Page</title>
</head>
<body>
	<div class="container text-center">
		<br>
    		<h1>Welcome <c:out value="${currentUser.first}"></c:out></h1>
    		<p><strong>First Name: </strong><c:out value="${currentUser.first}"></c:out>
    		<p><strong>Last Name: </strong><c:out value="${currentUser.last}"></c:out>
    		<p><strong>Email: </strong><c:out value="${currentUser.username}"></c:out>
    		<p><strong>Sign up date: </strong><c:out value="${currentUser.createdAt}"></c:out>
    		<p><strong>Last sign in: </strong><c:out value="${currentUser.updatedAt}"></c:out>
    		<form id="logoutForm" method="POST" action="/logout">
        		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        		<input type="submit" value="Logout!" class="btn-sm"/>
    		</form>
    </div>
</body>
</html>