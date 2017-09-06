'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var uuid = require('uuid');
var jwt = require('njwt');

module.exports = {
	auth
};

function auth(username, password) {

	if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {

		var error = new Error('Not Authorized');
		error.status = 401;
		throw error;

	}

}
