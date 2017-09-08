'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var Wiki = require(`${ROOT_DIR}/lib/models/wiki.model`);

module.exports = {
	getWiki,
	updateWiki
};

function getWiki() {

	return Wiki.findOne();

}

function updateWiki(string) {

	return Wiki.findOne()
	.then((result) => {

		if (!result) {

			return Wiki.create({
				html: string
			});

		}

		result.html = string;

		return result.save();

	});

}
