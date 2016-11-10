$(document).ready(function() {

	$('#serverCookieCreateIssue').on('click', function(ev) {
		serverCookieCreateIssue();
	});

});

function serverCookieCreateIssue() {
	$.ajax({
		url: '/serverCookieLogin',
		method: 'GET',
		success: function() {
			$('#createIssueFrame').attr('src', 'http://jiratest.yourzephyr.com:3530/secure/CreateIssueDetails!init.jspa?pid=10000&issuetype=10001&summary=Test_Issue');
			
		}
	});
}
