// to check Cannot read property 'msie' of undefined
jQuery.browser = {};
(function() {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();

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

	manageEvents();
}

function manageEvents() {
	//datePicker
	AJS.$('#duedate').datePicker({'overrideBrowserDefault': true});
	AJS.$('#duedate-trigger').on('click', function() {
		AJS.$('#duedate').trigger('click');
	});

	//single select
	AJS.$('.single-user-picker').auiSelect2();

	//multiselect
	AJS.$('#components').auiSelect2();
	AJS.$('#versions').auiSelect2();
	AJS.$('#fixVersions').auiSelect2();

	AJS.$('.ajs-multi-select-placeholder').hide();
}