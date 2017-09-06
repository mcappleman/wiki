'use strict';

const ROOT_DIR = process.env.ROOT_DIR;

var express = require('express');
var Router = new express.Router();
var WikiController = require(`${ROOT_DIR}/lib/controllers/wiki.controller`);

Router.get('/', (req, res, next) => {

	WikiController.getWiki()
	.then((html) => {

		return res.render('home', { html: html })

	});

});

module.exports = Router;

