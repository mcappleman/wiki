'use strict';

var accessToken = sessionStorage.getItem('accessToken');

if (!accessToken) {

	window.location.href = '/login';

}

function submitWiki() {

	var html = tinyMCE.get('editor').getContent()

	var xhr = new XMLHttpRequest();
	var url = '/api/wiki';

	xhr.open('PUT', url, true);
	xhr.setRequestHeader('Authorization', accessToken);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);

		} else if (xhr.readyState === 4 && xhr.status !== 200) {

			alert('Something went wrong ' + xhr.status);

		}

	};
	var data = JSON.stringify({ wiki: html });
	xhr.send(data);

}