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
	<title>Shoes</title>
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
			<h3><a href="/shoes">Go to Home Page</a></h3>
		</div>
		<h1>Hi ${currentUser.first}</h1>
		<div class="text-center">
    		<form:form method="POST" action="/shoe/add" modelAttribute="shoe">
    			<h3>List New Shoe</h3>
    			<p><form:errors path="shoe.*"/></p>
			<c:if test="${errorMessage != null}">
        			<font color="red"><c:out value="${errorMessage}"></c:out></font>
    			</c:if>
        		<p>
            		<form:label path="name"><strong>Name</strong></form:label>
            		<form:input path="name"/>
        		</p>
        		<p>
            		<form:label path="amount"><strong>Amount</strong></form:label>
            		<form:input path="amount"/>
        		</p>
        		<input type="submit" value="Sell" class="btn-sm"/>
    		</form:form>
    		</div>
	<h4>Your shoes that are not yet sold:</h4>
		<table class="table table-bordered table-striped table-hover">
			<tr>
				<th>Name</th>
				<th>Date Posted</th>
				<th>Amount</th>
				<th>Action</th>
			</tr>
			
			<c:forEach items="${allShoes}" var="shoe">
				<tr>
					<c:choose>
						<c:when test="${shoe.action == 'Buy' && shoe.sellerEmail == currentUser.username}">
							<td><c:out value="${shoe.name}" /></td>
							<td><c:out value="${shoe.createdAt}" /></td>
							<td>$<c:out value="${shoe.amount}"/></td>
							<td><a href="/delete/${shoe.id}">Delete</a></td>
						</c:when>
					</c:choose>
			</c:forEach>
		</table>
		<br>
		<h4>Sales</h4>
		<table class="table table-bordered table-striped table-hover">
			<tr>
				<th>Name</th>
				<th>Date Bought</th>
				<th>Buyer</th>
				<th>Amount</th>
			</tr>
			
			<c:forEach items="${allShoes}" var="shoe">
				<tr>
					<c:choose>
						<c:when test="${shoe.action == 'Bought' && shoe.sellerEmail == currentUser.username}">
							<td><c:out value="${shoe.name}" /></td>
							<td><c:out value="${shoe.updatedAt}" /></td>
							<td><c:out value="${shoe.buyerFirst}"/> <c:out value="${shoe.buyerLast}"/></td>
							<td>$<c:out value="${shoe.amount}"/></td>
						</c:when>
					</c:choose>
			</c:forEach>
		</table>
		<h4>Purchases</h4>
		<table class="table table-bordered table-striped table-hover">
			<tr>
				<th>Name</th>
				<th>Date Bought</th>
				<th>Seller</th>
				<th>Amount</th>
			</tr>
			
			<c:forEach items="${allShoes}" var="shoe">
				<tr>
					<c:choose>
						<c:when test="${shoe.action == 'Bought' && shoe.buyerEmail == currentUser.username}">
							<td><c:out value="${shoe.name}" /></td>
							<td><c:out value="${shoe.createdAt}"/></td>
							<td><c:out value="${shoe.sellerFirst}"/> <c:out value="${shoe.sellerLast}"/></td>
							<td>$<c:out value="${shoe.amount}"/></td>
						</c:when>
					</c:choose>
			</c:forEach>
		</table>
	</div>
</body>
</html>