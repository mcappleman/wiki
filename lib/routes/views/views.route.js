'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var express = require('express');
var Router = new express.Router();
var WikiController = require(`${ROOT_DIR}/lib/controllers/wiki.controller`);

Router.get('/', (req, res, next) => {

	WikiController.getWiki()
	.then((wiki) => {

		return res.render('home', { wiki: wiki })

	});

});

Router.get('/login', (req, res, next) => {

	return res.render('login')

});

Router.get('/edit', (req, res, next) => {

	WikiController.getWiki()
	.then((wiki) => {

		return res.render('edit', { wiki, wiki });

	});

});

module.exports = Router;

