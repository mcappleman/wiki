'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var express = require('express');
var Router = new express.Router();

var WikiController = require(`${ROOT_DIR}/lib/controllers/wiki.controller`);
var AuthController = require(`${ROOT_DIR}/lib/controllers/auth.controller`);
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

	return WikiController.updateWiki(req.body.wiki)
	.then((html) => {

		return res.send({
			status: 200,
			message: 'Here is the Wiki HTML String',
			data: html
		});

	});

});

Router.post('/auth', (req, res, next) => {

	return AuthController.auth(req.body.username, req.body.password)
	.then((jwt) => {

		return res.send({
			status: 200,
			message: 'Thanks for authenticating',
			data: jwt
		});

	})
	.catch((err) => {

		return res.send({
			status: err.status,
			message: err.message
		});

	});

});

Router.put('/clear-sessions', (req, res, next) => {

	return AuthController.changeSession()
	.then((jwt) => {

		return res.send({
			status: 200,
			message: 'Thanks for changing the Session.'
		});

	})
	.catch((err) => {

		return res.send({
			status: err.status,
			message: err.message
		});

	});

});

module.exports = Router;

