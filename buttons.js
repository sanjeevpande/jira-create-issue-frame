$(document).ready(function() {

	$('#login').on('click', function(ev) {
		login();
	});

	$('#serverCookieCreateIssue').on('click', function(ev) {
		serverCookieCreateIssue();
	});

	$('#clientCookieCreateIssue').on('click', function(ev) {
		clientCookieCreateIssue();
	});

	$('#tokenCreateIssue').on('click', function(ev) {
		tokenCreateIssue();
	});

	$('#quickCreateIssue').on('click', function(ev) {
		quickCreateIssue();
	});

	$('#getLoginDetails').on('click', function(ev) {
		getLoginDetails();
	});

	$('#searchIssues').on('click', function(ev) {
		searchIssues();
	});

	$('#logout').on('click', function(ev) {
		logout();
	});

});

function login() {
	$.ajax({
		url: '/login',
		method: 'GET',
		success: function(session) {
			console.log(session);
		}
	});
}

function tokenCreateIssue() {
	$.ajax({
		url: '/tokenLogin',
		method: 'GET',
		success: function(token) {
			$('#createIssueFrame').attr('src', 'http://jiratest.yourzephyr.com:3530/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10001&summary=Test_Issue&atl_token=' + token);
		}
	});
}

function serverCookieCreateIssue() {
	$.ajax({
		url: '/serverCookieLogin',
		method: 'GET',
		success: function() {
			$('#createIssueFrame').attr('src', 'http://jiratest.yourzephyr.com:3530/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10001&summary=Test_Issue');
		}
	});
}

function clientCookieCreateIssue() {
	$.ajax({
		url: '/clientCookieLogin',
		method: 'GET',
		success: function(cookies) {
			cookies = JSON.parse(cookies);
			cookies.forEach(function(cookie) {
				document.cookie = cookie + ';domain=.yourzephyr.com;path=/';
				$('#createIssueFrame')[0].contentDocument.cookie = cookie + ';domain=.yourzephyr.com;path=/';
			});
			$('#createIssueFrame').attr('src', 'http://jiratest.yourzephyr.com:3530/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10001&summary=Test_Issue');
		}
	});
}

function quickCreateIssue() {
	$.ajax({
		url: '/quickCreateIssue',
		method: 'GET',
		success: function(response) {
			var atl_token = JSON.parse(response).atl_token;
			$('#createIssueFrame').attr('src', 'http://jiratest.yourzephyr.com:3530/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10001&summary=Test_Issue&atl_token=' + atl_token);
		}
	});
}

function getLoginDetails() {
	$.ajax({
		url: '/getLoginDetails',
		method: 'GET',
		success: function(response) {
			console.log(response);
		}
	});
}

function searchIssues() {
	$.ajax({
		url: '/searchIssues',
		method: 'GET',
		success: function(response) {
			console.log(response);
		}
	});
}

function logout() {
	$.ajax({
		url: '/logout',
		method: 'GET',
		success: function(response) {
			console.log(response);
		}
	});
}