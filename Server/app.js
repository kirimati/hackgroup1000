'use strict';

var config2 = {
	appRoot: __dirname // required config2
};

try {
	process.chdir(config2.appRoot); //on se place au bon endroit pour executer le processus
}
catch (err) {
	console.log('chdir: ' + err);
}


var SwaggerExpress = require('swagger-express-mw');
var session = require('express-session');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var methodOverride = require('method-override');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require('request');
var jwt = require('jsonwebtoken');
var express = require('express')
    , http = require('http')
    , app = express()
    , server = http.createServer(app);
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var config = require('./api/controllers/config');
var url = 'mongodb://127.0.0.1:27017/SeekFriend';


module.exports = app; // for testing
var apiRouter = express.Router();


/* On utilise les sessions */
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');
//app.set('superSecret', config.secret);

app.use(express.static(__dirname));
app.use(methodOverride('_method'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ############ROUTE /api/users/login LOGIN#################

// Route Login hors du Swagger car sinon il est bloqué par le token d'authentification.


apiRouter.post('/users', function (req, res, next) {
	    MongoClient.connect(url,  function(err, db1) {
	      assert.equal(null, err);
	      console.log(">>>>>>>>>>><Connected correctly to server");
	      db1.collection("users").findOne({$or:[{"username": req.body.username},{"email":req.body.email}]},function(error, user) {
	        console.log(user);
	          if(user == null && error == null){
	                var data = req.body;
	                data.friends = [];
	                data.friendsRequest = [];
	                data.positions = [];
									console.log(data);
	                db1.collection("users").insert(data,function(err, probe) {
	                        if (!err){
														delete(data.password);
														var token = jwt.sign(data, config.secret, {expiresIn: 1440});
														console.log(token);
														res.json({
															success: 200,
															message: 'Enjoy your token!',
															token: token
														});
	                        }
	                        else{
														console.log('non');
	                            res.status(409).send();
	                        }
	                    });
	            }
	            else{
								console.log('toujours non')
	                res.status(409).send();
	            }
	        });
	    });
	});

apiRouter.post('/users/login', function (req, res, next) {
	MongoClient.connect(url,  function(err, db1) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db1.collection("users").findOne({"username": req.body.username,"password":req.body.password},function(error, user){
        if(user != null && error == null) {
            delete(user.password);
            var token = jwt.sign(user, config.secret, {expiresIn: 1440 // expires in 24 hours
            });
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
        }
        else {
            res.status(409).send();
        }
    });
  });

});


app.use('/api', apiRouter);

app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
				console.log("Fail token", token);
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
		console.log("pas de token");
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

SwaggerExpress.create(config2, function(err, swaggerExpress) {

    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(app);
    console.log("serveur bien lancé");
    server.listen(3000,'127.0.0.1');
});
