'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	'html': { 'type': String, 'required': true }
}, { timestamps: true, versionKey: false });

var WikiRecord = mongoose.model('WikiRecord', schema);
module.exports = WikiRecord;
