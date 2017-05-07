'use strict';
// findable on my Algolia account (tpriou)
var applicationID = "2P420325U0";
var apiKey = "c21f22088889008bed131a7130664057";
var indexName = "sets";

var algoliasearch = require('algoliasearch');
var client = algoliasearch(applicationID, apiKey);
var index = client.initIndex(indexName);

module.exports = {
      postUserSet,
      postUser,
      postLogin
}

// POST /sets/{username}
function postUserSet(req, res, next) {
      res.set('Content-Type', 'application/json');
      index.addObject({
            "title": req.body.title,
            "tag": req.body.tag,
            "username": req.swagger.params.username.value,
            "abstract": req.body.abstract,
            "picks": req.body.picks,
            "links": req.body.links
      }, function(err, content) {
            if (!err) {
                  res.status(201).send();
            } else {
                  res.status(404).send();
            }
      });
}

// POST /users
function postUser(req, res, next) {
      res.set('Content-Type', 'application/json');
      // nothing to see here
}

// POST /users/login
function postLogin(req, res, next) {
      res.set('Content-Type', 'application/json');
      // nothing to see here
}
