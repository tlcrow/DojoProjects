<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Admin</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div class="container">
		<form id="logoutForm" method="POST" action="/logout">
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<br>
			<input id="logout" class="btn btn-link" type="submit" value="Logout" />
		</form>
		<div class="text-center">
			<h1>Active Users</h1>
		</div>
		<table class="table table-bordered table-striped table-hover">
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Action</th>
			</tr>
			
			<c:forEach items="${currentUsers}" var="user">
				<tr>
					<td><c:out value="${user.first}" /> <c:out value="${user.last}" /></td>
					<td><c:out value="${user.username}" /></td>
					<c:choose>
						<c:when test="${user.isAdmin()}">
							<td>Admin</td>					
						</c:when>
						
						<c:otherwise>
							<td><a href="/admin/delete/${user.id}">Delete</a> | <a href="/admin/promote/${user.id}">Make-Admin</a></td>
						</c:otherwise>
					</c:choose>						
				</tr>
			</c:forEach>
		</table>
	</div>
</body>
</html>