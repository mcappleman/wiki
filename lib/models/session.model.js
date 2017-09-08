'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	'username': { 'type': String, 'required': true },
	'session_id': { 'type': String, 'required': true }
}, { timestamps: true, versionKey: false });

var SessionRecord = mongoose.model('SessionRecord', schema);
module.exports = SessionRecord;
