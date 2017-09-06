'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var WikiModel = require(`${ROOT_DIR}/lib/models/wiki.model`);

module.exports = {
	getWiki,
	updateWiki
};

function getWiki() {

	return Promise.resolve('<h1>Hello Wiki Page</h1>');

}

function updateWiki(string) {

	return Promise.resolve('<h1>Updated Wiki</h1>');

}
