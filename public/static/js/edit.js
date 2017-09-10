'use strict';

var accessToken = sessionStorage.getItem('accessToken');

if (!accessToken) {

	window.location.href = '/login';

}

verify();

tinymce.init({
	selector: 'textarea',
	height: 500,
	theme: 'modern',
	plugins: [
		'advlist autolink lists link image charmap print preview hr anchor pagebreak',
		'searchreplace wordcount visualblocks visualchars code fullscreen',
		'insertdatetime media nonbreaking save table contextmenu directionality',
		'template paste textcolor colorpicker textpattern imagetools codesample toc help emoticons hr'
	],
	toolbar1: 'formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
	image_advtab: true,
	templates: [
		{ title: 'Test template 1', content: 'Test 1' },
		{ title: 'Test template 2', content: 'Test 2' }
	],
	content_css: [
		'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
		'//www.tinymce.com/css/codepen.min.css'
	]
 });

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
			window.location.href = '/';

		} else if (xhr.readyState === 4 && xhr.status !== 200) {

			alert('Something went wrong ' + xhr.status);

		}

	};
	var data = JSON.stringify({ wiki: html });
	xhr.send(data);

}

function verify() {

	var xhr = new XMLHttpRequest();
	var url = '/api/verify';

	xhr.open('GET', url, true);
	xhr.setRequestHeader('Authorization', accessToken);
	// xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);

		} else if (xhr.readyState === 4 && xhr.status !== 200) {

			window.location.href = '/login';

		}

	};
	xhr.send();

}