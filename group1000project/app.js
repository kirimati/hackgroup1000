'use strict';

var SwaggerExpress = require('swagger-express-mw');

var express = require('express');
var app = require('express')();
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
module.exports = app; // for testing
var MongoUrl = 'mongodb://127.0.0.1:10010/SeekFriend';

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.use(express.static(__dirname + '/public'));
  app.use( bodyParser.json() );

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
