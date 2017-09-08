'use strict';

function login() {

	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	var xhr = new XMLHttpRequest();
	var url = '/api/auth';

	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);
			var accessToken = json.data.accessToken;
			sessionStorage.setItem('accessToken', accessToken);
			window.location.href = '/edit';

		} else if (xhr.readyState === 4 && xhr.status !== 200) {

			alert('Wrong Credentials!');

		}

	};
	var data = JSON.stringify({ username: username, password: password });
	xhr.send(data);

}