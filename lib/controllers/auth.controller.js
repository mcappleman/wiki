'use strict';

const ROOT_DIR = process.env.ROOT_DIR;
const SIGNING_KEY = process.env.SIGNING_KEY;

var uuid = require('uuid/v4');
var jwt = require('njwt');
var util = require('util');

var Session = require(`${ROOT_DIR}/lib/models/session.model`);

module.exports = {
	auth,
	changeSession
};

function auth(username, password) {

	if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {

		var error = new Error('Not Authorized');
		error.status = 401;
		throw error;

	}

	return Session.findOne({ username: username })
	.then((sess) => {

		if (!sess) {

			var sessId = uuid();

			return Session.create({
				username: username,
				session_id: sessId
			})
			.then(() => {

				return sessId;

			});

		}

		return sess.session_id;

	})
	.then((sessId) => {

		var jwtBody = {
			iss: 'MeWiki',
			sessionId: sessId
		}

		var token = jwt.create(jwtBody, SIGNING_KEY);
		token.setExpiration();

		return {
			accessToken: token.compact()
		}

	});

}

function changeSession() {

	return Session.findOne()
	.then((result) => {

		var sessId = uuid();

		if (!result) {

			return Session.create({
				username: username,
				session_id: sessId
			})
			.then(() => {

				return sessId;

			});

		}

		result.session_id = sessId;
		return result.save();

	})

}
