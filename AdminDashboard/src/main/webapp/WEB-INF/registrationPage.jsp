<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
<title>Registration Page</title>
</head>
<body>
	<div class="container">
		<br>
     	<c:if test="${logoutMessage != null}">
        		<font color="green"><c:out value="${logoutMessage}"></c:out></font>
    		</c:if>
		<h1>Login</h1>
    		<c:if test="${errorMessage != null}">
        		<font color="red"><c:out value="${errorMessage}"></c:out></font>
    		</c:if>
    		<form method="POST" action="/login">
        		<div class="group-form">
            		<label for="username"><strong>Email</strong></label>
            		<input type="text" id="username" name="username"/>
        		</div>
        		<br>
        		<div class="group-form">
            		<label for="password"><strong>Password</strong></label>
            		<input type="password" id="password" name="password"/>
        		</div>
        		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        		<input type="submit" value="Login!" class="btn-sm"/>
    		</form>
    		<br>
    		<h1>Register!</h1>
    		<p><form:errors path="user.*"/></p>
    		<form:form method="POST" action="/registration" modelAttribute="user">
        <div class="group-form">
            <form:label path="username"><strong>Email</strong></form:label>
            <form:input path="username"/>
        </div>
        <br>
        <div class="group-form">
            <form:label path="first"><strong>First Name</strong></form:label>
            <form:input path="first"/>
        </div>
        <br>
        <div class="group-form">
            <form:label path="last"><strong>Last Name</strong></form:label>
            <form:input path="last"/>
        </div>
        <br>
        <div class="group-form">
            <form:label path="password"><strong>Password</strong></form:label>
            <form:password path="password"/>
        </div>
        <br>
        <div class="group-form">
            <form:label path="passwordConfirmation"><strong>Password Confirmation</strong></form:label>
            <form:password path="passwordConfirmation"/>
        </div>
        <input type="submit" value="Register!" class="btn-sm"/>
    </form:form>
</body>
</html>