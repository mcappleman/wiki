'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var express = require('express');
var Router = new express.Router();

var WikiController = require(`${ROOT_DIR}/lib/controllers/wiki.controller`);
var AuthFilter = require(`${ROOT_DIR}/lib/filters/auth.filter.js`);

Router.get('/wiki', (req, res, next) => {

	return WikiController.getWiki()
	.then((html) => {

		return res.send({
			status: 200,
			message: 'Here is the Wiki HTML String',
			data: html
		});

	});

});

Router.put('/wiki', AuthFilter.validateToken, (req, res, next) => {

	return WikiController.updateWiki('Something')
	.then((html) => {

		return res.send({
			status: 200,
			message: 'Here is the Wiki HTML String',
			data: html
		});

	});

});

module.exports = Router;

