$.ajax({
	url: '/quickCreateIssue',
	method: 'GET',
	success: function(resposne) {
		quickCreateIssue(resposne);
	}
});

function quickCreateIssue(resposne) {
	resposne = JSON.parse(resposne);
	var fields = resposne.fields;
	
	var $issueContainer = $('<div></div>');
	$issueContainer.attr('id', 'jira-issue-container');
	fields.forEach(function(field) {
		var $div = $('<div></div>');
		$div.attr('id', 'jira-field-' + field.id);
		$div.html(field.editHtml);
		$issueContainer.append($div);
	});
	$('#issueWrapper').html($issueContainer);
}