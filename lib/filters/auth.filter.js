'use strict';

const ROOT_DIR = process.env.ROOT_DIR;
const SIGNING_KEY = process.env.SIGNING_KEY;

var njwt = require('njwt');
var util = require('util');

var Session = require(`${ROOT_DIR}/lib/models/session.model`);

var AuthFilter = {

    validateCookie: function(req, res, next) {

        var cookie = req.cookies.auth;

        if (!cookie) { return res.redirect('/login'); }

        req._token = cookie;
        next();

    },

    validateToken: function(req, res, next) {

        var authHeader = req.headers.authorization;

        if (!authHeader) {

            res.status(401);
            var err = new Error('No Authorization provided');
            return next(err);

        }

        var verify = util.promisify(njwt.verify);

        verify(authHeader, SIGNING_KEY)
        .then((verifiedToken) => {

            return Session.findOne({ session_id: verifiedToken.body.sessionId });

        })
        .then((result) => {

            if (!result) {

                throw Error();

            }

            req.username = result.username;
            next();

        })
        .catch((err) => {

            var error = new Error('Not Authorized');
            error.status = 401;

            return next(error);

        });

    }

};

module.exports = AuthFilter;
